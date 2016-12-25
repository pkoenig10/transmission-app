import * as React from "react";
import {NumberFormComponentProps, numberOnBlur, numberOnChange} from "./NumberFormComponent";
import {SelectFormComponentProps, selectOnChange} from "./SelectFormComponent";

interface SelectNumberFormComponentProps extends SelectFormComponentProps, NumberFormComponentProps {
    selectNumberDisabled: boolean;
}

export class SelectNumberFormComponent extends React.PureComponent<SelectNumberFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="select-number-form-label">
                    <label className="col-form-label">{this.props.label}:</label>
                </div>
                <div className="select-number-form-select-input">
                    <select
                        className="form-control"
                        disabled={this.props.disabled}
                        value={this.props.selectValue}
                        onChange={selectOnChange(this.props)}
                    >
                        {this.props.selectOptions.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                    </select>
                </div>
                <div className="select-number-form-number-input">
                    <input
                        type="text"
                        className="form-control"
                        disabled={this.props.disabled || this.props.selectNumberDisabled}
                        readOnly={this.props.readOnly}
                        value={this.props.numberValue}
                        onChange={numberOnChange(this.props)}
                        onBlur={numberOnBlur(this.props)}
                    />
                </div>
            </div>
        );
    }
}
