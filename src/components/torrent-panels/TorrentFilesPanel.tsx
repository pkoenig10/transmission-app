import {isEmpty, maxBy, sortBy, sumBy, uniqBy, xor} from "lodash";
import * as React from "react";
import {renameTorrentPathAction, setTorrentsAction, updateStateTorrentsOptionsAction} from "../../actions/TransmissionActions";
import {Priority, TorrentSetArgs} from "../../api/Transmission";
import {percent} from "../../utils/TransmissionUtils";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

interface Node {
    name: string;
    path: string;
    children: Node[];
    fileIndex: number;
}

interface TorrentFilesPanelState {
    collapsedPaths: string[];
}

export class TorrentFilesPanel extends React.PureComponent<TransmissionTorrentProps, TorrentFilesPanelState> {
    constructor(props: TransmissionTorrentProps) {
        super(props);
        this.state = {
            collapsedPaths: [],
        };
    }

    render() {
        const nodes: Node[] = this.nodes();

        const nodeRows: JSX.Element[] = [];
        nodes.forEach(node => this.nodeRows(node, 0, nodeRows));

        return (
            <div className="torrent-panel container-fluid">
                <div className="table-responsive">
                    <table className="files-table table table-striped">
                        <thead>
                            <tr>
                                <th className="files-table-col-name">
                                    <span className="files-table-header-name">Files</span>
                                </th>
                                <th className="files-table-col-progress">Progress</th>
                                <th className="files-table-col-wanted">Download</th>
                                <th className="files-table-col-priority">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodeRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private nodeRow = (node: Node, depth: number): JSX.Element => {
        if (this.isHidden(node)) {
            return undefined;
        }

        return (
            <tr key={node.path}>
                <td className="files-table-col-name">
                    <div className="files-table-cell-name">
                        <div className="files-table-cell-name-icons" onClick={this.isFolder(node) ? this.toggleCollapsed(node) : undefined}>
                            <i className="material-icons">{"_".repeat(depth)}</i>
                            <i className="material-icons">{this.isFolder(node) ? this.isCollapsed(node) ? "chevron_right" : "expand_more" : "_"}</i>
                            <i className="material-icons">{this.isFolder(node) ? "folder" : "description"}</i>
                        </div>
                        <input
                            type="text"
                            className="files-table-cell-name-input form-control"
                            defaultValue={node.name}
                            onBlur={this.nameOnBlur(node)}
                        />
                    </div>
                </td>
                <td className="files-table-col-progress">
                    {this.getProgress(node)}
                </td>
                <td className="files-table-col-wanted">
                    <input
                        type="checkbox"
                        checked={this.getWanted(node)}
                        ref={this.setIntermediate(node)}
                        onChange={this.wantedOnChange(node)}
                    />
                </td>
                <td className="files-table-col-priority">
                    <select
                        className="form-control"
                        value={this.getPriority(node)}
                        onChange={this.priorityOnChange(node)}
                    >
                        <option value={Priority.LOW}>Low</option>
                        <option value={Priority.NORMAL}>Normal</option>
                        <option value={Priority.HIGH}>High</option>
                    </select>
                </td>
            </tr>
        );
    }

    private nodes = (): Node[] => {
        const nodes: Node[] = [];
        this.props.torrent.files.forEach((file, index) => {
            this.fileNodes(index, file.name.split("/"), 0, nodes);
        });

        return this.sortNodes(nodes);
    }

    private fileNodes = (fileIndex: number, path: string[], depth: number, nodes: Node[] = []): Node[] => {
        if (depth >= path.length) {
            return nodes;
        }

        const fileNodePath: string = path.slice(0, depth + 1).join("/");
        const fileNode: Node = nodes.find(node => node.path === fileNodePath);
        if (fileNode) {
            this.fileNodes(fileIndex, path, depth + 1, fileNode.children);
        } else {
            nodes.push({
                name: path[depth],
                path: fileNodePath,
                children: this.fileNodes(fileIndex, path, depth + 1),
                fileIndex: depth === path.length - 1 ? fileIndex : undefined,
            });
        }

        return nodes;
    }

    private sortNodes = (nodes: Node[]): Node[] => {
        nodes.forEach(node => {
            node.children = this.sortNodes(node.children);
        });

        return sortBy(nodes, node => node.name);
    }

    private nodeRows = (node: Node, depth: number, nodeRows: JSX.Element[] = []): JSX.Element[] => {
        nodeRows.push(this.nodeRow(node, depth));
        node.children.forEach(childNode => {
            this.nodeRows(childNode, depth + 1, nodeRows);
        });

        return nodeRows;
    }

    private isFolder = (node: Node): boolean => {
        return node.fileIndex === undefined;
    }

    private isFile = (node: Node): boolean => {
        return node.fileIndex !== undefined;
    }

    private isCollapsed = (node: Node): boolean => {
        return this.state.collapsedPaths.includes(node.path);
    }

    private isHidden = (node: Node): boolean => {
        return this.state.collapsedPaths.some(collapsedPath => node.path.startsWith(collapsedPath + "/"));
    }

    private getProgress = (node: Node): string => {
        const files: number[] = this.getFiles(node).filter(file => this.props.torrent.wanted[file]);
        if (isEmpty(files)) {
            return undefined;
        }

        const bytesCompleted: number = sumBy(files, file => this.props.torrent.files[file].bytesCompleted);
        const length: number = sumBy(files, file => this.props.torrent.files[file].length);
        return percent(bytesCompleted / length);
    }

    private getWanted = (node: Node): boolean => {
        return this.getFiles(node).every(file => this.props.torrent.wanted[file]);
    }

    private getWantedIntermediate = (node: Node): boolean => {
        return uniqBy(this.getFiles(node), file => this.props.torrent.wanted[file]).length > 1;
    }

    private getPriority = (node: Node): Priority => {
        return maxBy(this.getFiles(node).map(file => this.props.torrent.priorities[file]));
    }

    private setIntermediate = (node: Node) => {
        return (checkbox: HTMLInputElement): void => {
            if (checkbox) {
                checkbox.indeterminate = this.getWantedIntermediate(node);
            }
        };
    }

    private toggleCollapsed = (node: Node) => {
        return (): void => {
            this.setState({
                ...this.state,
                collapsedPaths: xor(this.state.collapsedPaths, [node.path]),
            });
        };
    }

    private nameOnBlur = (node: Node): React.FocusEventHandler<HTMLInputElement> => {
        return (event: React.FormEvent<HTMLInputElement>): void => {
            this.props.dispatch(renameTorrentPathAction({
                ids: this.props.torrent.hashString,
                path: node.path + String.fromCharCode(0),
                name: event.currentTarget.value,
            }));
        };
    }

    private wantedOnChange = (node: Node): React.ChangeEventHandler<HTMLInputElement> => {
        return (event: React.ChangeEvent<HTMLInputElement>): void => {
            this.nodeOnChange(node, this.getWantedKey(event.currentTarget.checked));
        };
    }

    private priorityOnChange = (node: Node): React.ChangeEventHandler<HTMLSelectElement> => {
        return (event: React.ChangeEvent<HTMLSelectElement>): void => {
            this.nodeOnChange(node, this.getPriorityKey(parseInt(event.currentTarget.value)));
        };
    }

    private nodeOnChange = (node: Node, key: string): void => {
        const args: TorrentSetArgs = {
            ids: this.props.torrent.hashString,
            [key]: this.getFiles(node),
        };
        this.props.dispatch(updateStateTorrentsOptionsAction(args));
        this.props.dispatch(setTorrentsAction(args));
    }

    private getWantedKey = (wanted: boolean): string => {
        return wanted ? "files-wanted" : "files-unwanted";
    }

    private getPriorityKey = (priority: Priority): string => {
        switch (priority) {
            case Priority.LOW:
                return "priority-low";
            case Priority.NORMAL:
                return "priority-normal";
            case Priority.HIGH:
                return "priority-high";
        }
    }

    private getFiles(node: Node, files: number[] = []): number[] {
        if (this.isFile(node)) {
            files.push(node.fileIndex);
        }
        node.children.forEach(childNode => {
            this.getFiles(childNode, files);
        });
        return files;
    }
}
