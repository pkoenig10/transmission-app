import * as React from "react";
import {InfoFormComponent} from "../form-components/InfoFormComponent";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

interface SettingsInfoFormComponentProps extends SettingsFormComponentProps {
    infoKey: string;
}

export class SettingsInfoFormComponent extends React.PureComponent<SettingsInfoFormComponentProps, {}> {
    render() {
        return (
            <InfoFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                infoValue={settingsInfoValue(this.props)}
            />
        );
    }
}

function settingsInfoValue(props: SettingsInfoFormComponentProps): any {
    return props.session[props.infoKey];
}
