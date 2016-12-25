import * as React from "react";
import {setTorrentLocationAction, updateStateTorrentsOptionsAction} from "../../actions/TransmissionActions";
import {TextFormComponent, TextOnBlurHandler, TextOnChangeHandler} from "../form-components/TextFormComponent";
import {TorrentFormComponentProps} from "./TorrentFormComponent";

interface TorrentLocationFormComponentProps extends TorrentFormComponentProps {
    locationKey: string;
    locationPlaceholder?: string;
    locationRegExp?: RegExp;
}

export class TorrentLocationFormComponent extends React.PureComponent<TorrentLocationFormComponentProps, {}> {
    render() {
        return (
            <TextFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                textValue={locationValue(this.props)}
                textPlaceholder={this.props.locationPlaceholder}
                textRegExp={this.props.locationRegExp}
                textOnChange={locationOnChange(this.props)}
                textOnBlur={locationOnBlur(this.props)}
            />
        );
    }
}

function locationValue(props: TorrentLocationFormComponentProps): string {
    return props.torrent[props.locationKey];
}

function locationOnChange(props: TorrentLocationFormComponentProps): TextOnChangeHandler {
    return (value: string): void => {
        props.dispatch(updateStateTorrentsOptionsAction({
            ids: props.torrent.hashString,
            [props.locationKey]: value,
        }));
    };
}

function locationOnBlur(props: TorrentLocationFormComponentProps): TextOnBlurHandler {
    return (value: string): void => {
        props.dispatch(setTorrentLocationAction({
            ids: props.torrent.hashString,
            location: value,
            move: true,
        }));
    };
}
