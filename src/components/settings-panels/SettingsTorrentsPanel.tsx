import * as React from "react";
import {intRegExp} from "../form-components/NumberFormComponent";
import {dirRegExp} from "../form-components/TextFormComponent";
import {SettingsCheckboxFormComponent} from "../settings-form-components/SettingsCheckboxFormComponent";
import {SettingsCheckboxTextFormComponent} from "../settings-form-components/SettingsCheckboxTextFormComponent";
import {SettingsNumberFormComponent} from "../settings-form-components/SettingsNumberFormComponent";
import {SettingsTextFormComponent} from "../settings-form-components/SettingsTextFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

export class SettingsTorrentsPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">Adding</h5>
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Start torrent when added"
                    checkboxKey="start-added-torrents"
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Delete torrent file when added"
                    checkboxKey="trash-original-torrent-files"
                />
                <SettingsTextFormComponent
                    {...this.props}
                    label="Download to"
                    textKey="download-dir"
                    textRegExp={dirRegExp}
                />
                <h5 className="form-header">Incomplete</h5>
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Append .part to incomplete files"
                    checkboxKey="rename-partial-files"
                />
                <SettingsCheckboxTextFormComponent
                    {...this.props}
                    label="Keep incomplete files in"
                    checkboxKey="incomplete-dir-enabled"
                    textKey="incomplete-dir"
                    textRegExp={dirRegExp}
                />
                <SettingsCheckboxTextFormComponent
                    {...this.props}
                    label="Run script when torrent complete"
                    checkboxKey="script-torrent-done-enabled"
                    textKey="script-torrent-done-filename"
                />
                <h5 className="form-header">Cache</h5>
                <SettingsNumberFormComponent
                    {...this.props}
                    label="Cache size (MB)"
                    numberKey="cache-size-mb"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999999}
                />
            </div>
        );
    }
}
