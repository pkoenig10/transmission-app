import * as classNames from "classnames";
import * as React from "react";
import {reannounceTorrentsAction, startTorrentsNowAction, verifyTorrentsAction} from "../../actions/TransmissionActions";
import {Status} from "../../api/Transmission";
import {TorrentListItemDropdown, TorrentListItemDropdownProps} from "./TorrentListItemDropdown";

interface TorrentListItemActionDropdownProps extends TorrentListItemDropdownProps {}

export class TorrentListItemActionDropdown extends React.PureComponent<TorrentListItemActionDropdownProps, {}> {
    render() {
        const {torrentAction} = this.props;

        const startTorrentNow = torrentAction(startTorrentsNowAction);
        const verifyTorrent = torrentAction(verifyTorrentsAction);
        const reannounceTorrent = torrentAction(reannounceTorrentsAction);

        return (
            <TorrentListItemDropdown {...this.props}>
                <button className={classNames("dropdown-item", {disabled: this.startNowDisabled()})} onClick={startTorrentNow}>Resume Now</button>
                <div className="dropdown-divider"/>
                <button className="dropdown-item" onClick={verifyTorrent}>Verify</button>
                <button className="dropdown-item" onClick={reannounceTorrent}>Reannounce</button>
            </TorrentListItemDropdown>
        );
    }

    private startNowDisabled = (): boolean => {
        switch (this.props.torrent.status) {
            case Status.CHECK:
            case Status.CHECK_WAIT:
            case Status.DOWNLOAD:
            case Status.SEED:
                return true;
            default:
                return false;
        }
    }
}
