import * as React from "react";
import {InjectedRouter} from "react-router";
import {Dispatch} from "redux";
import {TransmissionActionCreator, startTorrentsAction, stopTorrentsAction} from "../../actions/TransmissionActions";
import {Ids, Status, Torrent} from "../../api/Transmission";
import {TransmissionState} from "../../state/TransmissionState";
import {RemoveTorrentModal} from "../modals/RemoveTorrentModal";
import {TorrentListItemActionDropdown} from "./TorrentListItemActionDropdown";
import {TorrentListItemInfo} from "./TorrentListItemInfo";
import {TorrentListItemProgress} from "./TorrentListItemProgress";
import {TorrentListItemQueueDropdown} from "./TorrentListItemQueueDropdown";

interface TorrentListItemProps {
    dispatch: Dispatch<TransmissionState>;
    router: InjectedRouter;
    torrent: Torrent;
    numTorrents: number;
    ignoreClick: boolean;
    setIgnoreClick: (ignoreClick: boolean) => void;
}

export class TorrentListItem extends React.PureComponent<TorrentListItemProps, {}> {
    render() {
        const {torrent} = this.props;

        const startTorrent = this.torrentAction(startTorrentsAction);
        const stopTorrent = this.torrentAction(stopTorrentsAction);

        return (
            <div className="torrent-list-item list-group-item">
                <button
                    className="torrent-list-item-start-stop-button btn btn-primary"
                    onClick={torrent.status === Status.STOPPED ? startTorrent : stopTorrent}
                >
                    <i className="material-icons">{torrent.status === Status.STOPPED ? "play_arrow" : "pause"}</i>
                </button>
                <div className="torrent-list-item-content" onClick={this.torrentInfo}>
                    <div className="torrent-list-item-header">
                        <b className="torrent-list-item-name">{torrent.name}</b>
                        <div className="torrent-list-item-action">
                            <i className="torrent-list-item-action-button btn-icon material-icons" onClick={this.stopPropagation} data-toggle="modal" data-target={`#remove-torrent-modal-${torrent.hashString}`} tabIndex={0}>delete</i>
                        </div>
                        <TorrentListItemQueueDropdown
                            torrent={torrent}
                            numTorrents={this.props.numTorrents}
                            torrentAction={this.torrentAction}
                            setIgnoreClick={this.props.setIgnoreClick}
                            iconName="swap_vert"
                        />
                        <TorrentListItemActionDropdown
                            torrent={torrent}
                            torrentAction={this.torrentAction}
                            setIgnoreClick={this.props.setIgnoreClick}
                            iconName="more_vert"
                        />
                    </div>
                    <TorrentListItemProgress torrent={torrent}/>
                    <TorrentListItemInfo torrent={torrent}/>
                </div>
                <RemoveTorrentModal dispatch={this.props.dispatch} torrent={this.props.torrent}/>
            </div>
        );
    }

    private torrentInfo = (): void => {
        if (this.props.ignoreClick) {
            this.props.setIgnoreClick(false);
        } else {
            this.props.router.push(`torrents/${this.props.torrent.hashString}`);
        }
    }

    private torrentAction = (actionCreator: TransmissionActionCreator<Ids>): React.MouseEventHandler<HTMLButtonElement> => {
        return (): void => {
            this.props.dispatch(actionCreator(this.props.torrent.hashString));
        };
    }

    private stopPropagation = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
    }
}
