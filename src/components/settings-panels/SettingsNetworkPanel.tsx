import * as React from "react";
import {testPortAction} from "../../actions/TransmissionActions";
import {intRegExp} from "../form-components/NumberFormComponent";
import {SettingsCheckboxFormComponent} from "../settings-form-components/SettingsCheckboxFormComponent";
import {SettingsNumberActionFormComponent} from "../settings-form-components/SettingsNumberActionFormComponent";
import {SettingsSelectFormComponent} from "../settings-form-components/SettingsSelectFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

export class SettingsNetworkPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">Port</h5>
                <SettingsNumberActionFormComponent
                    {...this.props}
                    label="Peer listening port"
                    numberKey="peer-port"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={65535}
                    actionLabel="Test"
                    actionValue={
                        <span>Port status: {
                            this.props.testingPort ? "Testing..." :
                            this.props.isPortOpen === true ? <span className="port-open">Open</span> :
                            this.props.isPortOpen === false ? <span className="port-closed">Closed</span> :
                            "Unknown"}
                        </span>}
                    actionCreator={testPortAction}
                    isLoading={this.props.testingPort}
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Randomize port on launch"
                    checkboxKey="peer-port-random-on-start"
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Use port forwarding from my router"
                    checkboxKey="port-forwarding-enabled"
                />
                <h5 className="form-header">Encryption</h5>
                <SettingsSelectFormComponent
                    {...this.props}
                    label="Encrpytion mode"
                    selectKey="encryption"
                    selectOptions={[
                        {label: "Allow encryption", value: "tolerated"},
                        {label: "Prefer encryption", value: "preferred"},
                        {label: "Require encryption", value: "required"},
                    ]}
                />
            </div>
        );
    }
}
