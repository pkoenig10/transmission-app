import * as classNames from "classnames";
import * as React from "react";
import {MapStateToProps, connect} from "react-redux";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {Link} from "react-router-dom";
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

interface TransmissionTorrentParams {
    hashString: string;
    panel: string;
}
type TransmissionTorrentRouteComponentProps = RouteComponentProps<TransmissionTorrentParams>;

export interface TransmissionTorrentProps extends TransmissionTorrentRouteComponentProps {
    dispatch: Dispatch<TransmissionState>;
    hashString: string;
    panel: string;
    torrentLoading: boolean;
    torrent: Torrent;
}

class TransmissionTorrent extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        if (!this.props.panel) {
            return <Redirect to={`/torrents/${this.props.hashString}/info`}/>;
        }

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

const mapStateToProps: MapStateToProps<Partial<TransmissionTorrentProps>, TransmissionTorrentRouteComponentProps> = (state: TransmissionState, ownProps: TransmissionTorrentRouteComponentProps): Partial<TransmissionTorrentProps> => {
    return {
        hashString: ownProps.match.params.hashString,
        panel: ownProps.match.params.panel,
        torrentLoading: !state.torrents,
        torrent: state.torrents ? findTorrent(state.torrents, ownProps.match.params.hashString) : undefined,
    };
};

export const TransmissionTorrentContainer = withRouter(connect(mapStateToProps)(TransmissionTorrent));
