import * as React from "react";
import {FormComponentProps} from "./FormComponent";

interface InfoFormComponentProps extends FormComponentProps {
    infoValue?: number | string;
}

export class InfoFormComponent extends React.PureComponent<InfoFormComponentProps, {}> {
    render() {
        return (
            <div className="form-row">
                <div className="info-form-label">
                    <label className="form-label">{this.props.label}:</label>
                </div>
                <div className="info-form-value">
                    <span>{this.props.infoValue}</span>
                </div>
            </div>
        );
    }
}
