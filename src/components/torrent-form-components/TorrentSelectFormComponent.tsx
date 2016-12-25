import * as React from "react";
import {setTorrentsAction, updateStateTorrentsOptionsAction} from "../../actions/TransmissionActions";
import {TorrentSetArgs} from "../../api/Transmission";
import {Option, OptionValue, SelectFormComponent, SelectOnChangeHandler} from "../form-components/SelectFormComponent";
import {TorrentFormComponentProps} from "./TorrentFormComponent";

export interface TorrentSelectFormComponentProps extends TorrentFormComponentProps {
    selectKey: string;
    selectOptions: Option[];
}

export class TorrentSelectFormComponent extends React.PureComponent<TorrentSelectFormComponentProps, {}> {
    render() {
        return (
            <SelectFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                selectValue={torrentSelectValue(this.props)}
                selectOptions={this.props.selectOptions}
                selectOnChange={torrentSelectOnChange(this.props)}
            />
        );
    }
}

export function torrentSelectValue(props: TorrentSelectFormComponentProps): OptionValue {
    return props.torrent[props.selectKey];
}

export function torrentSelectOnChange(props: TorrentSelectFormComponentProps): SelectOnChangeHandler {
    return (value: OptionValue): void => {
        const args: TorrentSetArgs = {
            ids: props.torrent.hashString,
            [props.selectKey]: value,
        };
        props.dispatch(updateStateTorrentsOptionsAction(args));
        props.dispatch(setTorrentsAction(args));
    };
}
