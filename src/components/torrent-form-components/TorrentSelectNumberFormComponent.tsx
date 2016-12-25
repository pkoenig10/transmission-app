import * as React from "react";
import {SelectNumberFormComponent} from "../form-components/SelectNumberFormComponent";
import {TorrentNumberFormComponentProps, torrentNumberOnBlur, torrentNumberOnChange, torrentNumberValue} from "./TorrentNumberFormComponent";
import {TorrentSelectFormComponentProps, torrentSelectOnChange, torrentSelectValue} from "./TorrentSelectFormComponent";

interface TorrentSelectNumberFormComponentProps extends TorrentSelectFormComponentProps, TorrentNumberFormComponentProps {
    selectNumberDisabled?: boolean;
}

export class TorrentSelectNumberFormComponent extends React.PureComponent<TorrentSelectNumberFormComponentProps, {}> {
    render() {
        return (
            <SelectNumberFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                selectValue={torrentSelectValue(this.props)}
                selectOptions={this.props.selectOptions}
                selectOnChange={torrentSelectOnChange(this.props)}
                numberValue={torrentNumberValue(this.props)}
                numberRegExp={this.props.numberRegExp}
                numberMin={this.props.numberMin}
                numberMax={this.props.numberMax}
                numberOnChange={torrentNumberOnChange(this.props)}
                numberOnBlur={torrentNumberOnBlur(this.props)}
                selectNumberDisabled={this.props.selectNumberDisabled}
            />
        );
    }
}
