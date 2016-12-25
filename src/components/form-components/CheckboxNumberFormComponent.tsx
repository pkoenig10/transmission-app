import * as React from "react";
import {CheckboxFormComponentProps, checkboxOnChange} from "./CheckboxFormComponent";
import {inputOnKeyPress} from "./FormComponent";
import {NumberFormComponentProps, numberOnBlur, numberOnChange} from "./NumberFormComponent";

interface CheckboxNumberFormComponentProps extends CheckboxFormComponentProps, NumberFormComponentProps {}

export class CheckboxNumberFormComponent extends React.PureComponent<CheckboxNumberFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="number-form-label">
                    <label className="form-check-label col-form-label">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            disabled={this.props.disabled}
                            checked={this.props.isChecked}
                            onChange={checkboxOnChange(this.props)}
                        />
                        <span> {this.props.label}:</span>
                    </label>
                </div>
                <div className="number-form-input">
                    <input
                        type="text"
                        className="form-control"
                        disabled={this.props.disabled || !this.props.isChecked}
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
