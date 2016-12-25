import {Location} from "history";
import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {MapStateToProps, connect} from "react-redux";
import {InjectedRouter, RouteComponentProps, withRouter} from "react-router";
import {Dispatch} from "redux";
import {TransmissionState} from "../state/TransmissionState";
import {AddTorrentsErrorAlert} from "./alerts/AddTorrentsErrorAlert";
import {DisconnectedAlert} from "./alerts/DisconnectedAlert";
import {AddTorrentsModal} from "./modals/AddTorrentsModal";
import {TransmissionNavbar} from "./TransmissionNavbar";

interface TransmissionAppQuery {
    url?: string;
}

interface TransmissionAppProps {
    dispatch?: Dispatch<TransmissionState>;
    router?: InjectedRouter;
    location: Location;
    connected: boolean;
    addTorrentsErrors: number;
}

class TransmissionApp extends React.PureComponent<TransmissionAppProps, {}> {
    render() {
        const query: TransmissionAppQuery = this.props.location.query;

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
                {this.props.children}
                <AddTorrentsModal
                    dispatch={this.props.dispatch}
                    router={this.props.router}
                    location={this.props.location}
                    url={query.url}
                />
            </div>
        );
    }
}

type TransmissionAppRouteComponentProps = RouteComponentProps<{}, {}>;

const mapStateToProps: MapStateToProps<TransmissionAppProps, TransmissionAppRouteComponentProps> = (state: TransmissionState, ownProps: TransmissionAppRouteComponentProps): TransmissionAppProps => {
    return {
        location: ownProps.location,
        connected: state.connected,
        addTorrentsErrors: state.addTorrentsErrors,
    };
};

export const TransmissionAppContainer = withRouter(connect(mapStateToProps)(TransmissionApp));
