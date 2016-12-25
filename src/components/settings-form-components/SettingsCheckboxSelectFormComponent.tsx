import * as React from "react";
import {CheckboxSelectFormComponent} from "../form-components/CheckboxSelectFormComponent";
import {SettingsCheckboxFormComponentProps, settingsCheckboxOnChange, settingsIsChecked} from "./SettingsCheckboxFormComponent";
import {SettingsSelectFormComponentProps, settingsSelectOnChange, settingsSelectValue} from "./SettingsSelectFormComponent";

interface SettingsCheckboxSelectFormComponentProps extends SettingsCheckboxFormComponentProps, SettingsSelectFormComponentProps {}

export class SettingsCheckboxSelectFormComponent extends React.PureComponent<SettingsCheckboxSelectFormComponentProps, {}> {
    render() {
        return (
            <CheckboxSelectFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                isChecked={settingsIsChecked(this.props)}
                checkboxOnChange={settingsCheckboxOnChange(this.props)}
                selectValue={settingsSelectValue(this.props)}
                selectOptions={this.props.selectOptions}
                selectOnChange={settingsSelectOnChange(this.props)}
            />
        );
    }
}
