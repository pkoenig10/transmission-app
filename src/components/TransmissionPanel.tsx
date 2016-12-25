import * as React from "react";

interface TransmissionPanelProps {
    icon: string;
    text: string;
}

export class TransmissionPanel extends React.PureComponent<TransmissionPanelProps, {}> {
    render() {
        return (
            <div className="panel">
                <i className="panel-icon material-icons">{this.props.icon}</i>
                <h5 className="panel-text">{this.props.text}</h5>
            </div>
        );
    }
}
