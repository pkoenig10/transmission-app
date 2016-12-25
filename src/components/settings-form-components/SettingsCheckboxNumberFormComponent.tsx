import * as React from "react";
import {CheckboxNumberFormComponent} from "../form-components/CheckboxNumberFormComponent";
import {SettingsCheckboxFormComponentProps, settingsCheckboxOnChange, settingsIsChecked} from "./SettingsCheckboxFormComponent";
import {SettingsNumberFormComponentProps, settingsNumberOnBlur, settingsNumberOnChange, settingsNumberValue} from "./SettingsNumberFormComponent";

interface SettingsCheckboxNumberFormComponentProps extends SettingsCheckboxFormComponentProps, SettingsNumberFormComponentProps {}

export class SettingsCheckboxNumberFormComponent extends React.PureComponent<SettingsCheckboxNumberFormComponentProps, {}> {
    render() {
        return (
            <CheckboxNumberFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                isChecked={settingsIsChecked(this.props)}
                checkboxOnChange={settingsCheckboxOnChange(this.props)}
                numberValue={settingsNumberValue(this.props)}
                numberRegExp={this.props.numberRegExp}
                numberMin={this.props.numberMin}
                numberMax={this.props.numberMax}
                numberOnChange={settingsNumberOnChange(this.props)}
                numberOnBlur={settingsNumberOnBlur(this.props)}
            />
        );
    }
}
