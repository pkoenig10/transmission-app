import * as React from "react";
import {ActionFormComponentProps} from "./ActionFormComponent";
import {inputOnKeyPress} from "./FormComponent";
import {NumberFormComponentProps, numberOnBlur, numberOnChange} from "./NumberFormComponent";

interface NumberActionFormComponentProps extends NumberFormComponentProps, ActionFormComponentProps {}

export class NumberActionFormComponent extends React.PureComponent<NumberActionFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="action-form-label">
                    <label className="col-form-label">{this.props.label}:</label>
                </div>
                <div className="action-form-input">
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
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={this.props.disabled || this.props.numberValue.toString().length === 0 || this.props.isLoading}
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
