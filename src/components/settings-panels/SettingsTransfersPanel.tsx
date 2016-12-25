import * as React from "react";
import {floatRegExp, intRegExp} from "../form-components/NumberFormComponent";
import {SettingsCheckboxNumberFormComponent} from "../settings-form-components/SettingsCheckboxNumberFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

export class SettingsTransfersPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">Downloading</h5>
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Maximum downloads"
                    checkboxKey="download-queue-enabled"
                    numberKey="download-queue-size"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999999}
                />
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Inactive if idle for (min)"
                    checkboxKey="queue-stalled-enabled"
                    numberKey="queue-stalled-minutes"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                />
                <h5 className="form-header">Seeding</h5>
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Maximum seeds"
                    checkboxKey="seed-queue-enabled"
                    numberKey="seed-queue-size"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999999}
                />
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Stop seeding at ratio"
                    checkboxKey="seedRatioLimited"
                    numberKey="seedRatioLimit"
                    numberRegExp={floatRegExp}
                    numberMin={0}
                />
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Stop seeding if idle for (min)"
                    checkboxKey="idle-seeding-limit-enabled"
                    numberKey="idle-seeding-limit"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                />
            </div>
        );
    }
}
