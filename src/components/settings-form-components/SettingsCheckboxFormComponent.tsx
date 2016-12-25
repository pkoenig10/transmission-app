import * as React from "react";
import {setSessionAction, updateStateSessionAction} from "../../actions/TransmissionActions";
import {Session} from "../../api/Transmission";
import {CheckboxFormComponent, CheckboxOnChangeHandler} from "../form-components/CheckboxFormComponent";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

export interface SettingsCheckboxFormComponentProps extends SettingsFormComponentProps {
    checkboxKey: string;
}

export class SettingsCheckboxFormComponent extends React.PureComponent<SettingsCheckboxFormComponentProps, {}> {
    render() {
        return (
            <CheckboxFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                isChecked={settingsIsChecked(this.props)}
                checkboxOnChange={settingsCheckboxOnChange(this.props)}
            />
        );
    }
}

export function settingsIsChecked(props: SettingsCheckboxFormComponentProps): boolean {
    return props.session[props.checkboxKey];
}

export function settingsCheckboxOnChange(props: SettingsCheckboxFormComponentProps): CheckboxOnChangeHandler {
    return (checked: boolean): void => {
        const session: Session = {
            [props.checkboxKey]: checked,
        };
        props.dispatch(updateStateSessionAction(session));
        props.dispatch(setSessionAction(session));
    };
}
