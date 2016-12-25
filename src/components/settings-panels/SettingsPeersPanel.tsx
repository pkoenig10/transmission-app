import * as React from "react";
import {updateBlocklistAction} from "../../actions/TransmissionActions";
import {intRegExp} from "../form-components/NumberFormComponent";
import {SettingsCheckboxFormComponent} from "../settings-form-components/SettingsCheckboxFormComponent";
import {SettingsCheckboxTextActionFormComponent} from "../settings-form-components/SettingsCheckboxTextActionFormComponent";
import {SettingsNumberFormComponent} from "../settings-form-components/SettingsNumberFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

// }
export class SettingsPeersPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        const blocklistSize: number = this.props.session["blocklist-size"];

        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">Peers</h5>
                <SettingsNumberFormComponent
                    {...this.props}
                    label="Maximum peers per torrent"
                    numberKey="peer-limit-per-torrent"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                />
                <SettingsNumberFormComponent
                    {...this.props}
                    label="Maximum peers overall"
                    numberKey="peer-limit-global"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={9999}
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Enable uTP for peer communication"
                    checkboxKey="utp-enabled"
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Use PEX to find more peers"
                    checkboxKey="pex-enabled"
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Use DHT to find more peers"
                    checkboxKey="dht-enabled"
                />
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Use LPD to find more peers"
                    checkboxKey="lpd-enabled"
                />
                <h5 className="form-header">Blocklist</h5>
                <SettingsCheckboxTextActionFormComponent
                    {...this.props}
                    label="Blocklist"
                    checkboxKey="blocklist-enabled"
                    textKey="blocklist-url"
                    actionLabel="Update"
                    actionValue={this.props.updatingBlocklist ?
                        "Updating blocklist..." :
                        `${blocklistSize.toLocaleString(undefined, {useGrouping: true})} IP address${blocklistSize !== 1 ? "es" : ""} in blocklist`}
                    actionCreator={updateBlocklistAction}
                    isLoading={this.props.updatingBlocklist}
                />
            </div>
        );
    }
}
