import * as React from "react";
import {TrackerStats} from "../../api/Transmission";
import {datetime} from "../../utils/TransmissionUtils";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

export class TorrentTrackersPanel extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        return (
            <div className="torrent-panel container-fluid">
                <div className="table-responsive">
                    <table className="trackers-table table table-striped">
                        <thead>
                            <tr>
                                <th className="trackers-table-col-host">Host</th>
                                <th className="trackers-table-col-peers">Peers</th>
                                <th className="trackers-table-col-seeders">Seeders</th>
                                <th className="trackers-table-col-leechers">Leechers</th>
                                <th className="trackers-table-col-announce">Announce</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.torrent.trackerStats.map(this.trackerRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private trackerRow = (trackerStats: TrackerStats, index: number): JSX.Element => {
        return (
            <tr key={index}>
                <td className="trackers-table-col-host">{trackerStats.host}</td>
                <td className="trackers-table-col-peers">{trackerStats.lastAnnounceSucceeded ? trackerStats.lastAnnouncePeerCount : undefined}</td>
                <td className="trackers-table-col-seeders">{trackerStats.seederCount >= 0 ? trackerStats.seederCount : undefined}</td>
                <td className="trackers-table-col-leechers">{trackerStats.leecherCount >= 0 ? trackerStats.leecherCount : undefined}</td>
                <td className="trackers-table-col-announce">{trackerStats.hasAnnounced ? datetime(trackerStats.lastAnnounceTime) : undefined}</td>
            </tr>
        );
    }
}
