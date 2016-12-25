import * as classNames from "classnames";
import * as React from "react";
import {MapStateToProps, connect} from "react-redux";
import {Link, RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {Torrent} from "../api/Transmission";
import {TransmissionState} from "../state/TransmissionState";
import {findTorrent} from "../utils/TransmissionUtils";
import {TorrentFilesPanel} from "./torrent-panels/TorrentFilesPanel";
import {TorrentInfoPanel} from "./torrent-panels/TorrentInfoPanel";
import {TorrentOptionsPanel} from "./torrent-panels/TorrentOptionsPanel";
import {TorrentPeersPanel} from "./torrent-panels/TorrentPeersPanel";
import {TorrentPiecesPanel} from "./torrent-panels/TorrentPiecesPanel";
import {TorrentTrackersPanel} from "./torrent-panels/TorrentTrackersPanel";
import {TransmissionLoading} from "./TransmissionLoading";
import {TransmissionPanel} from "./TransmissionPanel";

export interface TransmissionTorrentProps {
    dispatch?: Dispatch<TransmissionState>;
    hashString: string;
    panel: string;
    torrentLoading: boolean;
    torrent: Torrent;
}

class TransmissionTorrent extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        const navItems: JSX.Element[] = [
            this.navItem("Info", "info"),
            this.navItem("Files", "files"),
            this.navItem("Pieces", "pieces"),
            this.navItem("Peers", "peers"),
            this.navItem("Trackers", "trackers"),
            this.navItem("Options", "options"),
        ];

        return (
            <div className="torrent container-fluid">
                <div className="row">
                    <ul className="nav nav-pills">
                        {navItems}
                    </ul>
                </div>
                {this.props.torrentLoading ?
                    <TransmissionLoading/> :
                this.props.torrent ?
                    this.panel() :
                    <TransmissionPanel icon="error" text="Torrent not found"/>}
            </div>
        );
    }

    private navItem = (label: string, panel: string): JSX.Element => {
        return (
            <li key={panel} className="nav-item">
                <Link className={classNames("nav-link", {active: this.props.panel === panel})} to={`/torrents/${this.props.hashString}/${panel}`}>
                    {label}
                </Link>
            </li>
        );
    }

    private panel = (): JSX.Element => {
        switch (this.props.panel) {
            case "info":
                return <TorrentInfoPanel {...this.props}/>;
            case "files":
                return <TorrentFilesPanel {...this.props}/>;
            case "pieces":
                return <TorrentPiecesPanel {...this.props}/>;
            case "peers":
                return <TorrentPeersPanel {...this.props}/>;
            case "trackers":
                return <TorrentTrackersPanel {...this.props}/>;
            case "options":
                return <TorrentOptionsPanel {...this.props}/>;
            default:
                return undefined;
        }
    }
}

interface TransmissionTorrentParams {
    hashString: string;
    panel: string;
}
type TransmissionTorrentRouteComponentProps = RouteComponentProps<TransmissionTorrentParams, {}>;

const mapStateToProps: MapStateToProps<TransmissionTorrentProps, TransmissionTorrentRouteComponentProps> = (state: TransmissionState, ownProps?: TransmissionTorrentRouteComponentProps): TransmissionTorrentProps => {
    return {
        hashString: ownProps.params.hashString,
        panel: ownProps.params.panel,
        torrentLoading: !state.torrents,
        torrent: state.torrents ? findTorrent(state.torrents, ownProps.params.hashString) : undefined,
    };
};

export const TransmissionTorrentContainer = connect(mapStateToProps)(TransmissionTorrent);
