import * as React from "react";
import {CheckboxTextFormComponent} from "../form-components/CheckboxTextFormComponent";
import {SettingsCheckboxFormComponentProps, settingsCheckboxOnChange, settingsIsChecked} from "./SettingsCheckboxFormComponent";
import {SettingsTextFormComponentProps, settingsTextOnBlur, settingsTextOnChange, settingsTextValue} from "./SettingsTextFormComponent";

interface SettingsCheckboxTextFormComponentProps extends SettingsCheckboxFormComponentProps, SettingsTextFormComponentProps {}

export class SettingsCheckboxTextFormComponent extends React.PureComponent<SettingsCheckboxTextFormComponentProps, {}> {
    render() {
        return (
            <CheckboxTextFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                isChecked={settingsIsChecked(this.props)}
                checkboxOnChange={settingsCheckboxOnChange(this.props)}
                textValue={settingsTextValue(this.props)}
                textPlaceholder={this.props.textPlaceholder}
                textRegExp={this.props.textRegExp}
                textOnChange={settingsTextOnChange(this.props)}
                textOnBlur={settingsTextOnBlur(this.props)}
            />
        );
    }
}
