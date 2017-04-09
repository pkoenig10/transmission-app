import {parse} from "qs";
import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {MapStateToProps, connect} from "react-redux";
import {Redirect} from "react-router";
import {Switch} from "react-router";
import {Route} from "react-router";
import {RouteComponentProps, withRouter} from "react-router";
import {Dispatch} from "redux";
import {TransmissionState} from "../state/TransmissionState";
import {AddTorrentsErrorAlert} from "./alerts/AddTorrentsErrorAlert";
import {DisconnectedAlert} from "./alerts/DisconnectedAlert";
import {AddTorrentsModal} from "./modals/AddTorrentsModal";
import {TransmissionNavbar} from "./TransmissionNavbar";
import {TransmissionSettingsContainer} from "./TransmissionSettings";
import {TransmissionTorrentContainer} from "./TransmissionTorrent";
import {TransmissionTorrentListContainer} from "./TransmissionTorrentList";

interface TransmissionAppQuery {
    url?: string;
}

type TransmissionAppRouteComponentProps = RouteComponentProps<{}>;

interface TransmissionAppProps extends TransmissionAppRouteComponentProps {
    dispatch: Dispatch<TransmissionState>;
    query: TransmissionAppQuery;
    connected: boolean;
    addTorrentsErrors: number;
}

class TransmissionApp extends React.PureComponent<TransmissionAppProps, {}> {
    render() {
        return (
            <div className="app">
                <TransmissionNavbar/>
                <ReactCSSTransitionGroup
                    className="alerts"
                    transitionName="alert"
                    transitionEnter={false}
                    transitionLeaveTimeout={225}
                >
                    {!this.props.connected ?
                        <DisconnectedAlert/> :
                        undefined}
                    {this.props.addTorrentsErrors ?
                        <AddTorrentsErrorAlert
                            dispatch={this.props.dispatch}
                            errors={this.props.addTorrentsErrors}
                        /> :
                        undefined}
                </ReactCSSTransitionGroup>
                <Switch>
                    <Route path="/torrents/:hashString/:panel" component={TransmissionTorrentContainer}/>
                    <Route path="/torrents/:hashString" component={TransmissionTorrentContainer}/>
                    <Route path="/settings/:panel" component={TransmissionSettingsContainer}/>
                    <Route path="/settings" component={TransmissionSettingsContainer}/>
                    <Route exact path="/" component={TransmissionTorrentListContainer}/>
                    <Redirect to="/"/>
                </Switch>
                <AddTorrentsModal
                    dispatch={this.props.dispatch}
                    history={this.props.history}
                    location={this.props.location}
                    url={this.props.query.url}
                />
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<Partial<TransmissionAppProps>, TransmissionAppRouteComponentProps> = (state: TransmissionState, ownProps: TransmissionAppRouteComponentProps): Partial<TransmissionAppProps> => {
    return {
        query: parse(ownProps.location.search),
        connected: state.connected,
        addTorrentsErrors: state.addTorrentsErrors,
    };
};

export const TransmissionAppContainer = withRouter(connect(mapStateToProps)(TransmissionApp));
