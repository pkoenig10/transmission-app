import * as React from "react";
import {setTorrentsAction, updateStateTorrentsOptionsAction} from "../../actions/TransmissionActions";
import {NumberFormComponent, NumberOnBlurHandler, NumberOnChangeHandler} from "../form-components/NumberFormComponent";
import {TorrentFormComponentProps} from "./TorrentFormComponent";

export interface TorrentNumberFormComponentProps extends TorrentFormComponentProps {
    numberKey: string;
    numberRegExp: RegExp;
    numberMin?: number;
    numberMax?: number;
}

export class TorrentNumberFormComponent extends React.PureComponent<TorrentNumberFormComponentProps, {}> {
    render() {
        return (
            <NumberFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                numberValue={torrentNumberValue(this.props)}
                numberRegExp={this.props.numberRegExp}
                numberMin={this.props.numberMin}
                numberMax={this.props.numberMax}
                numberOnChange={torrentNumberOnChange(this.props)}
                numberOnBlur={torrentNumberOnBlur(this.props)}
            />
        );
    }
}

export function torrentNumberValue(props: TorrentNumberFormComponentProps): number {
    return props.torrent[props.numberKey];
}

export function torrentNumberOnChange(props: TorrentNumberFormComponentProps): NumberOnChangeHandler {
    return (value: string): void => {
        props.dispatch(updateStateTorrentsOptionsAction({
            ids: props.torrent.hashString,
            [props.numberKey]: value,
        }));
    };
}

export function torrentNumberOnBlur(props: TorrentNumberFormComponentProps): NumberOnBlurHandler {
    return (value: number): void => {
        props.dispatch(setTorrentsAction({
            ids: props.torrent.hashString,
            [props.numberKey]: value,
        }));
    };
}
