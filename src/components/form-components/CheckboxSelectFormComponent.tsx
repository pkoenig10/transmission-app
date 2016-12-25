import * as React from "react";
import {CheckboxFormComponentProps, checkboxOnChange} from "./CheckboxFormComponent";
import {SelectFormComponentProps, selectOnChange, selectOptions} from "./SelectFormComponent";

interface CheckboxSelectFormComponentProps extends CheckboxFormComponentProps, SelectFormComponentProps {}

export class CheckboxSelectFormComponent extends React.PureComponent<CheckboxSelectFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="select-form-label">
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
                <div className="select-form-input">
                    <select
                        className="form-control"
                        disabled={this.props.disabled || !this.props.isChecked}
                        value={this.props.selectValue}
                        onChange={selectOnChange(this.props)}
                    >
                        {selectOptions(this.props)}
                    </select>
                </div>
            </div>
        );
    }
}
