import {range} from "lodash";
import * as React from "react";
import {Option, SelectFormComponentProps, selectOnChange, selectOptions} from "../form-components/SelectFormComponent";
import {SettingsCheckboxFormComponentProps, settingsIsChecked} from "./SettingsCheckboxFormComponent";
import {SettingsSelectFormComponentProps, settingsSelectOnChange, settingsSelectValue} from "./SettingsSelectFormComponent";

const timeOptions: Option[] = range(0, 1440, 30).map(time => ({label: timeLabel(time), value: time}));

interface SettingsScheduleFormComponentProps extends SettingsCheckboxFormComponentProps {
    timeStartKey: string;
    timeEndKey: string;
}

export class SettingsScheduleFormComponent extends React.PureComponent<SettingsScheduleFormComponentProps, {}> {
    render() {
        const timeStartSettingsSelectProps: SettingsSelectFormComponentProps = this.timeSettingsSelectProps(this.props.timeStartKey);
        const timeStartSelectProps: SelectFormComponentProps = this.timeSelectProps(timeStartSettingsSelectProps);
        const timeEndSettingsSelectProps: SettingsSelectFormComponentProps = this.timeSettingsSelectProps(this.props.timeEndKey);
        const timeEndSelectProps: SelectFormComponentProps = this.timeSelectProps(timeEndSettingsSelectProps);
        return (
            <div className="form-row">
                <div className="schedule-form-time-spacer"/>
                <div className="schedule-form-time-start">
                    <select
                        className="form-control"
                        disabled={this.props.disabled || !settingsIsChecked(this.props)}
                        value={settingsSelectValue(timeStartSettingsSelectProps)}
                        onChange={selectOnChange(timeStartSelectProps)}
                    >
                        {selectOptions(timeStartSelectProps)}
                    </select>
                </div>
                <div className="schedule-form-time-separator">to</div>
                <div className="schedule-form-time-end">
                    <select
                        className="form-control"
                        disabled={this.props.disabled || !settingsIsChecked(this.props)}
                        value={settingsSelectValue(timeEndSettingsSelectProps)}
                        onChange={selectOnChange(timeEndSelectProps)}
                    >
                        {selectOptions(timeEndSelectProps)}
                    </select>
                </div>
            </div>
        );
    }

    private timeSettingsSelectProps = (timeKey: string): SettingsSelectFormComponentProps => {
        return {
            ...this.props,
            selectKey: timeKey,
            selectOptions: timeOptions,
        };
    }

    private timeSelectProps = (props: SettingsSelectFormComponentProps): SelectFormComponentProps => {
        return {
            selectValue: settingsSelectValue(props),
            selectOptions: timeOptions,
            selectOnChange: settingsSelectOnChange(props),
        };
    }
}

function timeLabel(time: number): string {
    const hour: number = Math.trunc(time / 60);
    const minute: number = time % 60;
    const amPm: string = hour < 12 ? "am" : "pm";
    return `${(hour % 12) || 12}:${minute < 10 ? "0" : ""}${minute} ${amPm}`;
}
