import {orderBy} from "lodash";
import * as React from "react";
import {Peer} from "../../api/Transmission";
import {percent, speedSize} from "../../utils/TransmissionUtils";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

export class TorrentPeersPanel extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        return (
            <div className="torrent-panel container-fluid">
                <div className="table-responsive">
                    <table className="peers-table table table-striped">
                        <thead>
                            <tr>
                                <th className="peers-table-col-address">Address</th>
                                <th className="peers-table-col-port">Port</th>
                                <th className="peers-table-col-download">Download</th>
                                <th className="peers-table-col-upload">Upload</th>
                                <th className="peers-table-col-progress">Percent</th>
                                <th className="peers-table-col-client">Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderBy(this.props.torrent.peers, ["rateToClient"], ["desc"]).map(this.peerRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private peerRow = (peer: Peer, index: number): JSX.Element => {
        return (
            <tr key={index}>
                <td className="peers-table-col-address">{peer.address}</td>
                <td className="peers-table-col-port">{peer.port}</td>
                <td className="peers-table-col-download">{peer.rateToClient ? speedSize(peer.rateToClient) : undefined}</td>
                <td className="peers-table-col-upload">{peer.rateToPeer ? speedSize(peer.rateToPeer) : undefined}</td>
                <td className="peers-table-col-progress">{percent(peer.progress)}</td>
                <td className="peers-table-col-client">{peer.clientName}</td>
            </tr>
        );
    }
}
