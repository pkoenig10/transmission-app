import * as React from "react";
import {setSessionAction, updateStateSessionAction} from "../../actions/TransmissionActions";
import {Session} from "../../api/Transmission";
import {Option, OptionValue, SelectFormComponent, SelectOnChangeHandler} from "../form-components/SelectFormComponent";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

export interface SettingsSelectFormComponentProps extends SettingsFormComponentProps {
    selectKey: string;
    selectOptions: Option[];
}

export class SettingsSelectFormComponent extends React.PureComponent<SettingsSelectFormComponentProps, {}> {
    render() {
        return (
            <SelectFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                selectValue={settingsSelectValue(this.props)}
                selectOptions={this.props.selectOptions}
                selectOnChange={settingsSelectOnChange(this.props)}
            />
        );
    }
}

export function settingsSelectValue(props: SettingsSelectFormComponentProps): OptionValue {
    return props.session[props.selectKey];
}

export function settingsSelectOnChange(props: SettingsSelectFormComponentProps): SelectOnChangeHandler {
    return (value: OptionValue): void => {
        const session: Session = {
            [props.selectKey]: value,
        };
        props.dispatch(updateStateSessionAction(session));
        props.dispatch(setSessionAction(session));
    };
}
