import * as React from "react";
import {NumberActionFormComponent} from "../form-components/NumberActionFormComponent";
import {SettingsActionFormComponentProps, settingsActionOnClick} from "./SettingsActionFormComponent";
import {SettingsNumberFormComponentProps, settingsNumberOnBlur, settingsNumberOnChange, settingsNumberValue} from "./SettingsNumberFormComponent";

export interface SettingsNumberActionFormComponentProps extends SettingsNumberFormComponentProps, SettingsActionFormComponentProps {}

export class SettingsNumberActionFormComponent extends React.PureComponent<SettingsNumberActionFormComponentProps, {}> {
    render() {
        return (
            <NumberActionFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                numberValue={settingsNumberValue(this.props)}
                numberRegExp={this.props.numberRegExp}
                numberMin={this.props.numberMin}
                numberMax={this.props.numberMax}
                numberOnChange={settingsNumberOnChange(this.props)}
                numberOnBlur={settingsNumberOnBlur(this.props)}
                actionLabel={this.props.actionLabel}
                actionValue={this.props.actionValue}
                actionOnClick={settingsActionOnClick(this.props)}
                isLoading={this.props.isLoading}
            />
        );
    }
}
