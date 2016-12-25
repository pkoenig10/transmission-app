import * as React from "react";
import {Dispatch} from "redux";
import {setStateAddTorrentsErrorsAction} from "../../actions/TransmissionActions";
import {TransmissionState} from "../../state/TransmissionState";

interface AddTorrentsErrorAlertProps {
    dispatch: Dispatch<TransmissionState>;
    errors: number;
}

export class AddTorrentsErrorAlert extends React.PureComponent<AddTorrentsErrorAlertProps, {}> {
    render() {
        return (
            <div className="alert alert-danger">
                <button type="button" className="close" onClick={this.dismiss}>
                    <span>&times;</span>
                </button>
                <div className="alert-content">
                    <b className="alert-title">Add Torrent Error!</b>
                    <span className="alert-text">{`Failed to add ${this.props.errors} torrent${this.props.errors !== 1 ? "s" : ""}`}</span>
                </div>
            </div>
        );
    }

    private dismiss = (): void => {
        this.props.dispatch(setStateAddTorrentsErrorsAction(undefined));
    }
}
