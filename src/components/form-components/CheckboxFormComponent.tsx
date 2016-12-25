import * as React from "react";
import {FormComponentProps} from "./FormComponent";

export type CheckboxOnChangeHandler = (checked: boolean) => void;

export interface CheckboxFormComponentProps extends FormComponentProps {
    isChecked: boolean;
    checkboxOnChange: CheckboxOnChangeHandler;
}

export class CheckboxFormComponent extends React.PureComponent<CheckboxFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="checkbox-form">
                    <label className="form-check-label col-form-label">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            disabled={this.props.disabled}
                            checked={this.props.isChecked}
                            onChange={checkboxOnChange(this.props)}
                        />
                        <span> {this.props.label}</span>
                    </label>
                </div>
            </div>
        );
    }
}

export function checkboxOnChange(props: CheckboxFormComponentProps): React.FormEventHandler<HTMLInputElement> {
    if (!props.checkboxOnChange) {
        return undefined;
    }

    return (event: React.FormEvent<HTMLInputElement>): void => {
        props.checkboxOnChange(event.currentTarget.checked);
    };
}
