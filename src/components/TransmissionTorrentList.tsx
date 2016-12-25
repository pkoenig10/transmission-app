import {sortBy} from "lodash";
import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {MapStateToProps, connect} from "react-redux";
import {InjectedRouter, withRouter} from "react-router";
import {Dispatch} from "redux";
import {Torrent} from "../api/Transmission";
import {TransmissionState} from "../state/TransmissionState";
import {TorrentListItem} from "./torrent-list-item/TorrentListItem";
import {TransmissionLoading} from "./TransmissionLoading";
import {TransmissionPanel} from "./TransmissionPanel";

interface TransmissionTorrentListProps {
    dispatch?: Dispatch<TransmissionState>;
    router?: InjectedRouter;
    torrentsLoading: boolean;
    torrents: Torrent[];
}

interface TransmissionTorrentListState {
    ignoreClick: boolean;
}

class TransmissionTorrentList extends React.PureComponent<TransmissionTorrentListProps, TransmissionTorrentListState> {
    constructor(props: TransmissionTorrentListProps) {
        super(props);
        this.state = {
            ignoreClick: false,
        };
    }

    render() {
        return (
            this.props.torrentsLoading ?
                <TransmissionLoading/> :
                <ReactCSSTransitionGroup
                    className="torrent-list list-group"
                    transitionName="torrent-list-item"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.props.torrents.length > 0 ?
                        sortBy(this.props.torrents, torrent => torrent.queuePosition).map(torrent => {
                            return (
                                <TorrentListItem
                                    key={torrent.hashString}
                                    dispatch={this.props.dispatch}
                                    router={this.props.router}
                                    torrent={torrent}
                                    numTorrents={this.props.torrents.length}
                                    ignoreClick={this.state.ignoreClick}
                                    setIgnoreClick={this.setIgnoreClick}
                                />
                            );
                        }) :
                        <TransmissionPanel key="panel" icon="dns" text="There are no torrents!"/>}
                </ReactCSSTransitionGroup>
        );
    }

    private setIgnoreClick = (ignoreClick: boolean): void => {
        this.setState({
            ...this.state,
            ignoreClick: ignoreClick,
        });
    }
}

const mapStateToProps: MapStateToProps<TransmissionTorrentListProps, {}> = (state: TransmissionState): TransmissionTorrentListProps => {
    return {
        torrentsLoading: !state.torrents,
        torrents: state.torrents,
    };
};

export const TransmissionTorrentListContainer = withRouter(connect(mapStateToProps)(TransmissionTorrentList));
