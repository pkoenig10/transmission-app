import {Location} from "history";
import {range} from "lodash";
import * as React from "react";
import {InjectedRouter} from "react-router";
import {Dispatch} from "redux";
import {addTorrentsAction, setStateAddTorrentsErrorsAction} from "../../actions/TransmissionActions";
import {TransmissionState} from "../../state/TransmissionState";
import {inputOnKeyPress} from "../form-components/FormComponent";
import {TransmissionModal} from "../TransmissionModal";

interface AddTorrentsModalProps {
    dispatch: Dispatch<TransmissionState>;
    router: InjectedRouter;
    location: Location;
    url?: string;
}

interface AddTorrentsModalState {
    url: string;
    files: FileList;
    downloadDir: string;
}

export class AddTorrentsModal extends TransmissionModal<AddTorrentsModalProps, AddTorrentsModalState> {
    private urlInput: HTMLInputElement;

    constructor(props: AddTorrentsModalProps) {
        super(props);
        this.state = this.initialState();
    }

    componentDidMount() {
        this.modal.on("show.bs.modal", this.onShow);
        this.modal.on("hide.bs.modal", this.onHide);
        if (this.props.url) {
            this.modal.modal("show");
        }
    }

    render() {
        return (
            <div className="modal fade" id="add-torrents-modal" ref={this.setModal} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={this.removeQuery}>
                                <span>&times;</span>
                            </button>
                            <h4 className="modal-title">Add Torrent</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Magnet Link:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    ref={this.setUrlInput}
                                    value={this.state.url}
                                    placeholder="Enter magnet link"
                                    onChange={this.setUrl}
                                    onKeyPress={inputOnKeyPress}
                                />
                            </div>
                            <div className="form-group">
                                <label className="add-torrent-modal-files-label">
                                    <label className="add-torrent-modal-files-label-text form-label">Files: </label>
                                    <label className="add-torrent-modal-files-label-button btn btn-secondary btn-sm" htmlFor="files">Select Files</label>
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="files"
                                    hidden
                                    multiple
                                    onChange={this.setFiles}
                                />
                                <ul className="add-torrent-modal-files-list">
                                    {this.state.files ? range(this.state.files.length).map(index => <li key={index}>{this.state.files[index].name}</li>) : undefined}
                                </ul>
                            </div>
                            {this.downloadDirs()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removeQuery}>Cancel</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.addTorrents} disabled={!this.state.url && !this.state.files}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private downloadDirs = (): JSX.Element => {
        if (!config.downloadDirs) {
            return undefined;
        }

        return (
            <div className="form-group">
                <label className="form-label">Download Location: </label>
                {config.downloadDirs.map((downloadDir, index) => {
                    return (
                        <div key={index} className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    value={downloadDir.path}
                                    checked={downloadDir.path === this.state.downloadDir}
                                    onChange={this.setDownloadDir(downloadDir.path)}
                                />
                                <span> {downloadDir.name}</span>
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }

    private initialState = (): AddTorrentsModalState => {
        return {
            url: this.props.url ? this.props.url : "",
            files: undefined,
            downloadDir: config.downloadDirs ? config.downloadDirs[0].path : undefined,
        };
    }

    private onShow = (): void => {
        this.props.dispatch(setStateAddTorrentsErrorsAction(undefined));
        this.setState(this.initialState());
    }

    private onHide = (): void => {
        if (this.props.location.search) {
            this.props.router.replace(this.props.location.pathname);
        }
    }

    private setUrlInput = (urlInput: HTMLInputElement): void => {
        this.urlInput = urlInput;
    }

    private setUrl = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            url: event.currentTarget.value,
        });
    }

    private setFiles = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            files: event.currentTarget.files,
        });
    }

    private setDownloadDir = (downloadDir: string): React.FormEventHandler<HTMLInputElement> => {
        return (): void => {
            this.setState({
                ...this.state,
                downloadDir: downloadDir,
            });
        };
    }

    private removeQuery = (): void => {
        if (this.props.location.search) {
            this.props.router.push(this.props.location.pathname);
        }
    }

    private addTorrents = (): void => {
        this.props.dispatch(addTorrentsAction({
            url: this.state.url,
            files: this.state.files,
            downloadDir: this.state.downloadDir,
        }));
    }
}
