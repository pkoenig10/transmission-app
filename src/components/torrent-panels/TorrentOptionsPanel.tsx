import * as React from "react";
import {Priority, SeedIdleMode, SeedRatioMode} from "../../api/Transmission";
import {floatRegExp, intRegExp} from "../form-components/NumberFormComponent";
import {dirRegExp} from "../form-components/TextFormComponent";
import {TorrentCheckboxFormComponent} from "../torrent-form-components/TorrentCheckboxFormComponent";
import {TorrentCheckboxNumberFormComponent} from "../torrent-form-components/TorrentCheckboxNumberFormComponent";
import {TorrentLocationFormComponent} from "../torrent-form-components/TorrentLocationFormComponent";
import {TorrentNumberFormComponent} from "../torrent-form-components/TorrentNumberFormComponent";
import {TorrentSelectFormComponent} from "../torrent-form-components/TorrentSelectFormComponent";
import {TorrentSelectNumberFormComponent} from "../torrent-form-components/TorrentSelectNumberFormComponent";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

export class TorrentOptionsPanel extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        const {torrent} = this.props;

        return (
            <div className="torrent-panel container">
                <TorrentLocationFormComponent
                    {...this.props}
                    label="Location"
                    locationKey="downloadDir"
                    locationRegExp={dirRegExp}
                />
                <TorrentSelectFormComponent
                    {...this.props}
                    label="Priority"
                    selectKey="bandwidthPriority"
                    selectOptions={[
                        {label: "Low", value: Priority.LOW},
                        {label: "Normal", value: Priority.NORMAL},
                        {label: "High", value: Priority.HIGH},
                    ]}
                />
                <TorrentCheckboxFormComponent
                    {...this.props}
                    label="Use global limits"
                    checkboxKey="honorsSessionLimits"
                />
                <TorrentCheckboxNumberFormComponent
                    {...this.props}
                    label="Download (KB/s)"
                    disabled={torrent.honorsSessionLimits}
                    checkboxKey="downloadLimited"
                    numberKey="downloadLimit"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <TorrentCheckboxNumberFormComponent
                    {...this.props}
                    label="Upload (KB/s)"
                    disabled={torrent.honorsSessionLimits}
                    checkboxKey="uploadLimited"
                    numberKey="uploadLimit"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <TorrentNumberFormComponent
                    {...this.props}
                    label="Maximum peers"
                    numberKey="peer-limit"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                />
                <TorrentSelectNumberFormComponent
                    {...this.props}
                    label="Stop seeding at ratio"
                    selectKey="seedRatioMode"
                    selectOptions={[
                        {label: "Global", value: SeedRatioMode.GLOBAL},
                        {label: "Value", value: SeedRatioMode.SINGLE},
                        {label: "Unlimited", value: SeedRatioMode.UNLIMITED},
                    ]}
                    numberKey="seedRatioLimit"
                    numberRegExp={floatRegExp}
                    numberMin={0}
                    selectNumberDisabled={torrent.seedRatioMode !== SeedRatioMode.SINGLE}
                />
                <TorrentSelectNumberFormComponent
                    {...this.props}
                    label="Stop seeding if idle for (min)"
                    selectKey="seedIdleMode"
                    selectOptions={[
                        {label: "Global", value: SeedIdleMode.GLOBAL},
                        {label: "Value", value: SeedIdleMode.SINGLE},
                        {label: "Unlimited", value: SeedIdleMode.UNLIMITED},
                    ]}
                    numberKey="seedIdleLimit"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                    selectNumberDisabled={torrent.seedIdleMode !== SeedIdleMode.SINGLE}
                />
            </div>
        );
    }
}
