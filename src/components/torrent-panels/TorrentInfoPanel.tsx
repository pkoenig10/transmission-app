import * as React from "react";
import {Status} from "../../api/Transmission";
import {datetime, duration, percent, progress, speedSize, status} from "../../utils/TransmissionUtils";
import {InfoFormComponent} from "../form-components/InfoFormComponent";
import {TextFormComponent} from "../form-components/TextFormComponent";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

export class TorrentInfoPanel extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        const {torrent} = this.props;

        return (
            <div className="torrent-panel container">
                <InfoFormComponent
                    label="Name"
                    infoValue={torrent.name}
                />
                <InfoFormComponent
                    label="Status"
                    infoValue={status(torrent)}
                />
                <InfoFormComponent
                    label="Progress"
                    infoValue={progress(torrent)}
                />
                <InfoFormComponent
                    label="Available"
                    infoValue={percent((torrent.haveValid + torrent.haveUnchecked + torrent.desiredAvailable) / torrent.sizeWhenDone)}
                />
                <InfoFormComponent
                    label="Download speed"
                    infoValue={speedSize(torrent.rateDownload)}
                />
                <InfoFormComponent
                    label="Upload speed"
                    infoValue={speedSize(torrent.rateUpload)}
                />
                <InfoFormComponent
                    label="Downloading time"
                    infoValue={duration(torrent.secondsDownloading)}
                />
                <InfoFormComponent
                    label="Seeding time"
                    infoValue={duration(torrent.secondsSeeding)}
                />
                <InfoFormComponent
                    label="Ratio"
                    infoValue={(torrent.uploadRatio >= 0 ? torrent.uploadRatio : 0).toFixed(2)}
                />
                <InfoFormComponent
                    label="ETA"
                    infoValue={torrent.status === Status.DOWNLOAD || torrent.status === Status.SEED ? duration(torrent.eta) : undefined}
                />
                <InfoFormComponent
                    label="Idle ETA"
                    infoValue={torrent.status === Status.SEED ? duration(torrent.etaIdle) : undefined}
                />
                <InfoFormComponent
                    label="Added"
                    infoValue={datetime(torrent.addedDate)}
                />
                <InfoFormComponent
                    label="Done"
                    infoValue={datetime(torrent.doneDate)}
                />
                <InfoFormComponent
                    label="Error"
                    infoValue={torrent.errorString}
                />
                <TextFormComponent
                    label="Magnet link"
                    readOnly
                    textValue={torrent.magnetLink}
                />
            </div>
        );
    }
}
