import * as React from "react";
import {ActionFormComponentProps} from "./ActionFormComponent";
import {CheckboxFormComponentProps, checkboxOnChange} from "./CheckboxFormComponent";
import {inputOnKeyPress} from "./FormComponent";
import {TextFormComponentProps, textOnBlur, textOnChange} from "./TextFormComponent";

interface CheckboxTextActionFormComponentProps extends CheckboxFormComponentProps, TextFormComponentProps, ActionFormComponentProps {}

export class CheckboxTextActionFormComponent extends React.PureComponent<CheckboxTextActionFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="action-form-label">
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
                <div className="action-form-input">
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
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={this.props.disabled || !this.props.isChecked || this.props.textValue.length === 0 || this.props.isLoading}
                        onClick={this.props.actionOnClick}
                    >
                        <span>{this.props.actionLabel}</span>
                    </button>
                </div>
                <div className="action-form-value">
                    <small className="form-text text-muted">{this.props.actionValue}</small>
                </div>
            </div>
        );
    }
}
