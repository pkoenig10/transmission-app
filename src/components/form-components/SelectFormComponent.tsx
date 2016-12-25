import * as React from "react";
import {FormComponentProps} from "./FormComponent";

export type OptionValue = number | string;

export interface Option {
    label: string;
    value: OptionValue;
}

export type SelectOnChangeHandler = (value: OptionValue) => void;

export interface SelectFormComponentProps extends FormComponentProps {
    selectValue: OptionValue;
    selectOptions: Option[];
    selectOnChange: SelectOnChangeHandler;
}

export class SelectFormComponent extends React.PureComponent<SelectFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="select-form-label">
                    <label className="col-form-label">{this.props.label}:</label>
                </div>
                <div className="select-form-input">
                    <select
                        className="form-control"
                        disabled={this.props.disabled}
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

export function selectOptions(props: SelectFormComponentProps): JSX.Element[] {
    return props.selectOptions.map((option, index) => <option key={index} value={option.value}>{option.label}</option>);
}

export function selectOnChange(props: SelectFormComponentProps): React.FormEventHandler<HTMLSelectElement> {
    if (!props.selectOnChange) {
        return undefined;
    }

    return (event: React.FormEvent<HTMLSelectElement>): void => {
        props.selectOnChange(props.selectOptions[event.currentTarget.selectedIndex].value);
    };
}
