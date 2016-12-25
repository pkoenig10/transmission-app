import * as React from "react";
import {TransmissionActionCreator} from "../../actions/TransmissionActions";
import {Ids, Torrent} from "../../api/Transmission";
import {TransmissionDropdown} from "../TransmissionDropdown";

export interface TorrentListItemDropdownProps {
    torrent: Torrent;
    torrentAction: (actionCreator: TransmissionActionCreator<Ids>) => React.MouseEventHandler<HTMLButtonElement>;
    setIgnoreClick: (ignoreClick: boolean) => void;
    iconName: string;
}

export class TorrentListItemDropdown extends TransmissionDropdown<TorrentListItemDropdownProps, {}> {
    render() {
        return (
            <div className="torrent-list-item-action dropdown" ref={this.setDropdown}>
                <i className="torrent-list-item-action-button btn-icon material-icons " onClick={this.setIgnoreClick} data-toggle="dropdown" tabIndex={0}>{this.props.iconName}</i>
                <div className="torrent-list-item-action-dropdown-menu dropdown-menu dropdown-menu-right">
                    {this.props.children}
                </div>
            </div>
        );
    }

    private setIgnoreClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.stopPropagation();
        const ignoreClick: boolean = this.dropdown.hasClass("open");
        this.props.setIgnoreClick(ignoreClick);
    }
}
