import * as React from "react";
import {CheckboxNumberFormComponent} from "../form-components/CheckboxNumberFormComponent";
import {TorrentCheckboxFormComponentProps, torrentCheckboxOnChange, torrentIsChecked} from "./TorrentCheckboxFormComponent";
import {TorrentNumberFormComponentProps, torrentNumberOnBlur, torrentNumberOnChange, torrentNumberValue} from "./TorrentNumberFormComponent";

interface TorrentCheckboxNumberFormComponentProps extends TorrentCheckboxFormComponentProps, TorrentNumberFormComponentProps {}

export class TorrentCheckboxNumberFormComponent extends React.PureComponent<TorrentCheckboxNumberFormComponentProps, {}> {
    render() {
        return (
            <CheckboxNumberFormComponent
                label={this.props.label}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                isChecked={torrentIsChecked(this.props)}
                checkboxOnChange={torrentCheckboxOnChange(this.props)}
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
