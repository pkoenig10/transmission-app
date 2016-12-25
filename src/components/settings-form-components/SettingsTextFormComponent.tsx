import * as React from "react";
import {setSessionAction, updateStateSessionAction} from "../../actions/TransmissionActions";
import {TextFormComponent, TextOnBlurHandler, TextOnChangeHandler} from "../form-components/TextFormComponent";
import {SettingsFormComponentProps} from "./SettingsFormComponent";

export interface SettingsTextFormComponentProps extends SettingsFormComponentProps {
    textKey: string;
    textPlaceholder?: string;
    textRegExp?: RegExp;
}

export class SettingsTextFormComponent extends React.PureComponent<SettingsTextFormComponentProps, {}> {
    render() {
        return (
            <TextFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                textValue={settingsTextValue(this.props)}
                textPlaceholder={this.props.textPlaceholder}
                textRegExp={this.props.textRegExp}
                textOnChange={settingsTextOnChange(this.props)}
                textOnBlur={settingsTextOnBlur(this.props)}
            />
        );
    }
}

export function settingsTextValue(props: SettingsTextFormComponentProps): string {
    return props.session[props.textKey];
}

export function settingsTextOnChange(props: SettingsTextFormComponentProps): TextOnChangeHandler {
    return (value: string): void => {
        props.dispatch(updateStateSessionAction({
            [props.textKey]: value,
        }));
    };
}

export function settingsTextOnBlur(props: SettingsTextFormComponentProps): TextOnBlurHandler {
    return (value: string): void => {
        props.dispatch(setSessionAction({
            [props.textKey]: value,
        }));
    };
}
