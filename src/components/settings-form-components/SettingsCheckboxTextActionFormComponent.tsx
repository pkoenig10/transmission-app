import * as React from "react";
import {CheckboxTextActionFormComponent} from "../form-components/CheckboxTextActionFormComponent";
import {SettingsActionFormComponentProps, settingsActionOnClick} from "./SettingsActionFormComponent";
import {SettingsCheckboxFormComponentProps, settingsCheckboxOnChange, settingsIsChecked} from "./SettingsCheckboxFormComponent";
import {SettingsTextFormComponentProps, settingsTextOnBlur, settingsTextOnChange, settingsTextValue} from "./SettingsTextFormComponent";

interface SettingsCheckboxTextActionFormComponentProps extends SettingsCheckboxFormComponentProps, SettingsTextFormComponentProps, SettingsActionFormComponentProps {}

export class SettingsCheckboxTextActionFormComponent extends React.PureComponent<SettingsCheckboxTextActionFormComponentProps, {}> {
    render() {
        return (
            <CheckboxTextActionFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                isChecked={settingsIsChecked(this.props)}
                checkboxOnChange={settingsCheckboxOnChange(this.props)}
                textValue={settingsTextValue(this.props)}
                textPlaceholder={this.props.textPlaceholder}
                textRegExp={this.props.textRegExp}
                textOnChange={settingsTextOnChange(this.props)}
                textOnBlur={settingsTextOnBlur(this.props)}
                actionLabel={this.props.actionLabel}
                actionValue={this.props.actionValue}
                actionOnClick={settingsActionOnClick(this.props)}
                isLoading={this.props.isLoading}
            />
        );
    }
}
