import * as React from "react";
import {Dispatch} from "redux";
import {removeTorrentsAction} from "../../actions/TransmissionActions";
import {Torrent} from "../../api/Transmission";
import {TransmissionState} from "../../state/TransmissionState";
import {TransmissionModal} from "../TransmissionModal";

interface RemoveTorrentModalProps {
    dispatch: Dispatch<TransmissionState>;
    torrent: Torrent;
}

interface RemoveTorrentModalState {
    deleteFiles: boolean;
}

export class RemoveTorrentModal extends TransmissionModal<RemoveTorrentModalProps, RemoveTorrentModalState> {
    constructor(props: RemoveTorrentModalProps) {
        super(props);
        this.state = this.initialState();
    }

    componentDidMount() {
        this.modal.on("show.bs.modal", this.onShow);
    }

    render() {
        return (
            <div className="modal fade" id={`remove-torrent-modal-${this.props.torrent.hashString}`} ref={this.setModal} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title">Remove Torrent</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <p>Remove <b>{this.props.torrent.name}</b>?</p>
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={this.state.deleteFiles}
                                        onChange={this.setDeleteFiles}
                                    />
                                    <span> Delete downloaded files</span>
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.removeTorrents}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private initialState = (): RemoveTorrentModalState => {
        return {
            deleteFiles: this.props.torrent.percentDone < 1,
        };
    }

    private onShow = (): void => {
        this.setState(this.initialState());
    }

    private setDeleteFiles = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            deleteFiles: event.currentTarget.checked,
        });
    }

    private removeTorrents = (): void => {
        this.props.dispatch(removeTorrentsAction({
            ids: this.props.torrent.hashString,
            "delete-local-data": this.state.deleteFiles,
        }));
    }
}
