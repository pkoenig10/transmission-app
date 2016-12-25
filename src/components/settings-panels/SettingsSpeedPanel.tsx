import * as React from "react";
import {ScheduleDay} from "../../api/Transmission";
import {intRegExp} from "../form-components/NumberFormComponent";
import {SettingsCheckboxFormComponent} from "../settings-form-components/SettingsCheckboxFormComponent";
import {SettingsCheckboxNumberFormComponent} from "../settings-form-components/SettingsCheckboxNumberFormComponent";
import {SettingsCheckboxSelectFormComponent} from "../settings-form-components/SettingsCheckboxSelectFormComponent";
import {SettingsNumberFormComponent} from "../settings-form-components/SettingsNumberFormComponent";
import {SettingsScheduleFormComponent} from "../settings-form-components/SettingsScheduleFormComponent";
import {TransmissionSettingsProps} from "../TransmissionSettings";

export class SettingsSpeedPanel extends React.PureComponent<TransmissionSettingsProps, {}> {
    render() {
        return (
            <div className="settings-panel container-fluid">
                <h5 className="form-header">Speed Limits</h5>
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Download (KB/s)"
                    checkboxKey="speed-limit-down-enabled"
                    numberKey="speed-limit-down"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <SettingsCheckboxNumberFormComponent
                    {...this.props}
                    label="Upload (KB/s)"
                    checkboxKey="speed-limit-up-enabled"
                    numberKey="speed-limit-up"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <h5 className="form-header">Alternative Speed Limits</h5>
                <SettingsCheckboxFormComponent
                    {...this.props}
                    label="Use alternative speed limits"
                    checkboxKey="alt-speed-enabled"
                />
                <SettingsNumberFormComponent
                    {...this.props}
                    label="Download (KB/s)"
                    numberKey="alt-speed-down"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <SettingsNumberFormComponent
                    {...this.props}
                    label="Upload (KB/s)"
                    numberKey="alt-speed-up"
                    numberRegExp={intRegExp}
                    numberMin={0}
                    numberMax={999999}
                />
                <SettingsCheckboxSelectFormComponent
                    {...this.props}
                    label="Schedule times"
                    checkboxKey="alt-speed-time-enabled"
                    selectKey="alt-speed-time-day"
                    selectOptions={[
                        {label: "Sunday", value: ScheduleDay.SUN},
                        {label: "Monday", value: ScheduleDay.MON},
                        {label: "Tuesday", value: ScheduleDay.TUES},
                        {label: "Wednesday", value: ScheduleDay.WED},
                        {label: "Thursday", value: ScheduleDay.THURS},
                        {label: "Friday", value: ScheduleDay.FRI},
                        {label: "Saturday", value: ScheduleDay.SAT},
                        {label: "Weekdays", value: ScheduleDay.WEEKDAY},
                        {label: "Weekends", value: ScheduleDay.WEEKEND},
                        {label: "Every day", value: ScheduleDay.ALL},
                    ]}
                />
                <SettingsScheduleFormComponent
                    {...this.props}
                    checkboxKey="alt-speed-time-enabled"
                    timeStartKey="alt-speed-time-begin"
                    timeEndKey="alt-speed-time-end"
                />
            </div>
        );
    }
}
