import * as classNames from "classnames";
import * as React from "react";
import {Status, Torrent} from "../../api/Transmission";
import {duration, peers, progress, speedSize, status} from "../../utils/TransmissionUtils";

interface TorrentListItemInfoProps {
    torrent: Torrent;
}

export class TorrentListItemInfo extends React.PureComponent<TorrentListItemInfoProps, {}> {
    render() {
        const {torrent} = this.props;

        return (
            <div className="torrent-list-item-info">
                <span>
                    <span>{status(torrent)}</span>
                    <span className="separator"/>
                    <span>{progress(torrent)}</span>
                </span>
                <br className="hidden-md-up"/>
                <span className={classNames({invisible: this.transferInfoInvisible()})}>
                    <span className="separator hidden-sm-down"/>
                    <span>{`${peers(torrent)} / ${torrent.peersConnected}`}</span>
                    <span className="separator"/>
                    <span>{speedSize(torrent.rateDownload)}</span>
                    <span className="arrow-down"/>
                    <span>{speedSize(torrent.rateUpload)}</span>
                    <span className="arrow-up"/>
                    <span className="separator"/>
                    <span>{duration(Math.max(torrent.eta, torrent.etaIdle))}</span>
                </span>
            </div>
        );
    }

    private transferInfoInvisible = (): boolean => {
        switch (this.props.torrent.status) {
            case Status.STOPPED:
            case Status.CHECK:
            case Status.CHECK_WAIT:
            case Status.DOWNLOAD_WAIT:
            case Status.SEED_WAIT:
                return true;
            default:
                return false;
        }
    }
}
