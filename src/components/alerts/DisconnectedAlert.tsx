import * as React from "react";

export class DisconnectedAlert extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div className="alert alert-danger">
                <div className="alert-content">
                    <b className="alert-title">Disconnected!</b>
                    <span className="alert-text"> Trying to reconnect...</span>
                </div>
            </div>
        );
    }
}
