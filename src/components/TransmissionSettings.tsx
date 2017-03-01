import * as classNames from "classnames";
import * as React from "react";
import {MapStateToProps, connect} from "react-redux";
import {Link, RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {Session} from "../api/Transmission";
import {TransmissionState} from "../state/TransmissionState";
import {SettingsAboutPanel} from "./settings-panels/SettingsAboutPanel";
import {SettingsNetworkPanel} from "./settings-panels/SettingsNetworkPanel";
import {SettingsPeersPanel} from "./settings-panels/SettingsPeersPanel";
import {SettingsSpeedPanel} from "./settings-panels/SettingsSpeedPanel";
import {SettingsTorrentsPanel} from "./settings-panels/SettingsTorrentsPanel";
import {SettingsTransfersPanel} from "./settings-panels/SettingsTransfersPanel";
import {TransmissionLoading} from "./TransmissionLoading";

export interface TransmissionSettingsProps {
    dispatch?: Dispatch<TransmissionState>;
    panel: string;
    session: Session;
    isPortOpen: boolean;
    updatingBlocklist: boolean;
    testingPort: boolean;
}

class TransmissionSettings extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        const navItems: JSX.Element[] = [
            this.navItem("Speed", "speed"),
            this.navItem("Transfers", "transfers"),
            this.navItem("Torrents", "torrents"),
            this.navItem("Peers", "peers"),
            this.navItem("Network", "network"),
            this.navItem("About", "about"),
        ];

        return (
            <div className="settings container">
                <div className="row hidden-md-up">
                    <ul className="nav nav-pills">
                        {navItems}
                    </ul>
                </div>
                <div className="row ">
                    <div className="col-md-3 hidden-sm-down">
                        <ul className="nav nav-pills nav-stacked">
                            {navItems}
                        </ul>
                    </div>
                    <div className="col-12 col-md-9">
                        {this.props.session ? this.panel() : <TransmissionLoading/>}
                    </div>
                </div>
            </div>
        );
    }

    private navItem = (label: string, panel: string): JSX.Element => {
        return (
            <li key={panel} className="nav-item">
                <Link className={classNames("nav-link", {active: this.props.panel === panel})} to={`/settings/${panel}`}>
                    {label}
                </Link>
            </li>
        );
    }

    private panel = (): JSX.Element => {
        switch (this.props.panel) {
            case "speed":
                return <SettingsSpeedPanel {...this.props}/>;
            case "transfers":
                return <SettingsTransfersPanel {...this.props}/>;
            case "torrents":
                return <SettingsTorrentsPanel {...this.props}/>;
            case "peers":
                return <SettingsPeersPanel {...this.props}/>;
            case "network":
                return <SettingsNetworkPanel {...this.props}/>;
            case "about":
                return <SettingsAboutPanel {...this.props}/>;
            default:
                return undefined;
        }
    }
}

interface TransmissionSettingsParams {
    panel: string;
}
type TransmissionSettingsRouteComponentProps = RouteComponentProps<TransmissionSettingsParams, {}>;

const mapStateToProps: MapStateToProps<TransmissionSettingsProps, {}> = (state: TransmissionState, ownProps?: TransmissionSettingsRouteComponentProps): TransmissionSettingsProps => {
    return {
        session: state.session,
        isPortOpen: state.isPortOpen,
        updatingBlocklist: state.updatingBlocklist,
        testingPort: state.testingPort,
        panel: ownProps.params.panel,
    };
};

export const TransmissionSettingsContainer = connect(mapStateToProps)(TransmissionSettings);
