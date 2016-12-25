import * as React from "react";
import {setTorrentsAction, updateStateTorrentsOptionsAction} from "../../actions/TransmissionActions";
import {TorrentSetArgs} from "../../api/Transmission";
import {CheckboxFormComponent, CheckboxOnChangeHandler} from "../form-components/CheckboxFormComponent";
import {TorrentFormComponentProps} from "./TorrentFormComponent";

export interface TorrentCheckboxFormComponentProps extends TorrentFormComponentProps {
    checkboxKey: string;
}

export class TorrentCheckboxFormComponent extends React.PureComponent<TorrentCheckboxFormComponentProps, {}> {
    render() {
        return (
            <CheckboxFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                isChecked={torrentIsChecked(this.props)}
                checkboxOnChange={torrentCheckboxOnChange(this.props)}
            />
        );
    }
}

export function torrentIsChecked(props: TorrentCheckboxFormComponentProps): boolean {
    return props.torrent[props.checkboxKey];
}

export function torrentCheckboxOnChange(props: TorrentCheckboxFormComponentProps): CheckboxOnChangeHandler {
    return (checked: boolean): void => {
        const args: TorrentSetArgs = {
            ids: props.torrent.hashString,
            [props.checkboxKey]: checked,
        };
        props.dispatch(updateStateTorrentsOptionsAction(args));
        props.dispatch(setTorrentsAction(args));
    };
}
