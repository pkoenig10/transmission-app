import * as React from "react";
import {CheckboxFormComponentProps, checkboxOnChange} from "./CheckboxFormComponent";
import {inputOnKeyPress} from "./FormComponent";
import {TextFormComponentProps, textOnBlur, textOnChange} from "./TextFormComponent";

interface CheckboxTextFormComponentProps extends CheckboxFormComponentProps, TextFormComponentProps {}

export class CheckboxTextFormComponent extends React.PureComponent<CheckboxTextFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="text-form-label">
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
                <div className="text-form-input">
                    <input
                        type="text"
                        className="form-control"
                        disabled={this.props.disabled || !this.props.isChecked}
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
