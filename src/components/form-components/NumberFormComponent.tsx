import * as React from "react";
import {FormComponentProps, inputOnKeyPress} from "./FormComponent";

export const intRegExp: RegExp = /^\d*$/;
export const floatRegExp: RegExp = /^\d*.?\d{0,4}$/;

export type NumberOnChangeHandler = (value: string) => void;
export type NumberOnBlurHandler = (value: number) => void;

export interface NumberFormComponentProps extends FormComponentProps {
    numberValue: number;
    numberRegExp: RegExp;
    numberMin?: number;
    numberMax?: number;
    numberOnChange?: NumberOnChangeHandler;
    numberOnBlur?: NumberOnBlurHandler;
}

export class NumberFormComponent extends React.PureComponent<NumberFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="number-form-label">
                    <label className="col-form-label">{this.props.label}:</label>
                </div>
                <div className="number-form-input">
                    <input
                        type="text"
                        className="form-control"
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        value={this.props.numberValue}
                        onChange={numberOnChange(this.props)}
                        onBlur={numberOnBlur(this.props)}
                        onKeyPress={inputOnKeyPress}
                    />
                </div>
            </div>
        );
    }
}

export function numberOnChange(props: NumberFormComponentProps): React.FormEventHandler<HTMLInputElement> {
    if (!props.numberOnChange) {
        return undefined;
    }

    return (event: React.FormEvent<HTMLInputElement>): void => {
        const value: string = event.currentTarget.value;
        if (!props.numberRegExp.test(value)) {
            return;
        }

        const valueAsNumber: number = parseFloat(value);
        if ((props.numberMin !== undefined && valueAsNumber < props.numberMin) ||
            (props.numberMax !== undefined && props.numberMax < valueAsNumber)) {
            return;
        }

        props.numberOnChange(value);
    };
}

export function numberOnBlur(props: NumberFormComponentProps): React.FocusEventHandler<HTMLInputElement> {
    if (!props.numberOnBlur) {
        return undefined;
    }

    return (event: React.FocusEvent<HTMLInputElement>): void => {
        props.numberOnBlur(parseFloat(event.currentTarget.value));
    };
}
