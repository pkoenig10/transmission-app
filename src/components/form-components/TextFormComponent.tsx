import * as React from "react";
import {FormComponentProps, inputOnKeyPress} from "./FormComponent";

export const dirRegExp: RegExp = /^(\/.*)?$/;

export type TextOnChangeHandler = (value: string) => void;
export type TextOnBlurHandler = (value: string) => void;

export interface TextFormComponentProps extends FormComponentProps {
    textValue: string;
    textPlaceholder?: string;
    textRegExp?: RegExp;
    textOnChange?: TextOnChangeHandler;
    textOnBlur?: TextOnBlurHandler;
}

export class TextFormComponent extends React.PureComponent<TextFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="text-form-label">
                    <label className="col-form-label">{this.props.label}:</label>
                </div>
                <div className="text-form-input">
                    <input
                        type="text"
                        className="form-control"
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        value={this.props.textValue}
                        placeholder={this.props.textPlaceholder}
                        onChange={textOnChange(this.props)}
                        onBlur={textOnBlur(this.props)}
                        onKeyPress={inputOnKeyPress}
                    />
                </div>
            </div>
        );
    }
}

export function textOnChange(props: TextFormComponentProps): React.FormEventHandler<HTMLInputElement> {
    if (!props.textOnChange) {
        return undefined;
    }

    return (event: React.FormEvent<HTMLInputElement>): void => {
        const value: string = event.currentTarget.value;
        if (props.textRegExp && !props.textRegExp.test(value)) {
            return;
        }

        props.textOnChange(value);
    };
}

export function textOnBlur(props: TextFormComponentProps): React.FocusEventHandler<HTMLInputElement> {
    if (!props.textOnBlur) {
        return undefined;
    }

    return (event: React.FocusEvent<HTMLInputElement>): void => {
        props.textOnBlur(event.currentTarget.value);
    };
}
