import * as React from "react";
import {setSessionAction, updateStateSessionAction} from "../../actions/TransmissionActions";
import {NumberFormComponent, NumberOnBlurHandler, NumberOnChangeHandler} from "../form-components/NumberFormComponent";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

export interface SettingsNumberFormComponentProps extends SettingsFormComponentProps {
    numberKey: string;
    numberRegExp: RegExp;
    numberMin?: number;
    numberMax?: number;
}

export class SettingsNumberFormComponent extends React.PureComponent<SettingsNumberFormComponentProps, {}> {
    render() {
        return (
            <NumberFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
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

export function settingsNumberValue(props: SettingsNumberFormComponentProps): number {
    return props.session[props.numberKey];
}

export function settingsNumberOnChange(props: SettingsNumberFormComponentProps): NumberOnChangeHandler {
    return (value: string): void => {
        props.dispatch(updateStateSessionAction({
            [props.numberKey]: value,
        }));
    };
}

export function settingsNumberOnBlur(props: SettingsNumberFormComponentProps): NumberOnBlurHandler {
    return (value: number): void => {
        props.dispatch(setSessionAction({
            [props.numberKey]: value,
        }));
    };
}
