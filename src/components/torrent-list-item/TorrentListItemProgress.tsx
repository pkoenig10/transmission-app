import * as classNames from "classnames";
import * as React from "react";
import {ErrorType, Status, Torrent} from "../../api/Transmission";
import {percent} from "../../utils/TransmissionUtils";

interface TorrentListItemProgressProps {
    torrent: Torrent;
}

export class TorrentListItemProgress extends React.PureComponent<TorrentListItemProgressProps, {}> {
    render() {
        const {torrent} = this.props;

        return (
            <div className="torrent-list-item-progress progress">
                <div
                    className={classNames("progress-bar", this.progressBarClass(), {
                        "progress-bar-transition": !document.hidden,
                        "progress-bar-striped progress-bar-animated": this.progressBarActive(),
                    })}
                    style={{width: percent(torrent.percentDone, 2)}}
                />
            </div>
        );
    }

    private progressBarClass = (): string => {
        switch (this.props.torrent.error) {
            case ErrorType.TRACKER_WARNING:
            case ErrorType.TRACKER_ERROR:
            case ErrorType.LOCAL_ERROR:
                return "progress-bar-danger";
        }

        switch (this.props.torrent.status) {
            case Status.STOPPED:
                return "progress-bar-secondary";
            case Status.CHECK:
            case Status.CHECK_WAIT:
                return "progress-bar-info";
            case Status.SEED_WAIT:
            case Status.SEED:
                return "progress-bar-success";
            default:
                return undefined;
        }
    }

    private progressBarActive = (): boolean => {
        switch (this.props.torrent.status) {
            case Status.CHECK:
            case Status.DOWNLOAD:
            case Status.SEED:
                return true;
            default:
                return false;
        }
    }
}
