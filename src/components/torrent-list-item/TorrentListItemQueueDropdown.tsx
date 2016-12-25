import * as classNames from "classnames";
import * as React from "react";
import {moveBottomQueueAction, moveDownQueueAction, moveTopQueueAction, moveUpQueueAction} from "../../actions/TransmissionActions";
import {TorrentListItemDropdown, TorrentListItemDropdownProps} from "./TorrentListItemDropdown";

interface TorrentListItemQueueDropdownProps extends TorrentListItemDropdownProps {
    numTorrents: number;
}

export class TorrentListItemQueueDropdown extends React.Component<TorrentListItemQueueDropdownProps, {}> {
    render() {
        const {torrentAction} = this.props;

        const moveUpQueue = torrentAction(moveUpQueueAction);
        const moveDownQueue = torrentAction(moveDownQueueAction);
        const moveTopQueue = torrentAction(moveTopQueueAction);
        const moveBottomQueue = torrentAction(moveBottomQueueAction);

        return (
            <TorrentListItemDropdown {...this.props}>
                <button className={classNames("dropdown-item", {disabled: this.isTop()})} onClick={moveUpQueue}>Move Up</button>
                <button className={classNames("dropdown-item", {disabled: this.isBottom()})} onClick={moveDownQueue}>Move Down</button>
                <div className="dropdown-divider"/>
                <button className={classNames("dropdown-item", {disabled: this.isTop()})} onClick={moveTopQueue}>Move to Top</button>
                <button className={classNames("dropdown-item", {disabled: this.isBottom()})} onClick={moveBottomQueue}>Move to Bottom</button>
            </TorrentListItemDropdown>
        );
    }

    private isTop = (): boolean => {
        return this.props.torrent.queuePosition === 0;
    }

    private isBottom = (): boolean => {
        return this.props.torrent.queuePosition === this.props.numTorrents - 1;
    }
}
