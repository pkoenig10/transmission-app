import * as React from "react";
import {SettingsInfoFormComponent} from "../settings-form-components/SettingsInfoFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

export class SettingsAboutPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">About</h5>
                <SettingsInfoFormComponent
                    {...this.props}
                    label="Transmission version"
                    infoKey="version"
                />
                <SettingsInfoFormComponent
                    {...this.props}
                    label="RPC version"
                    infoKey="rpc-version"
                />
                <SettingsInfoFormComponent
                    {...this.props}
                    label="RPC minimum version"
                    infoKey="rpc-version-minimum"
                />
            </div>
        );
    }
}
