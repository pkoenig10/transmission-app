import * as classNames from "classnames";
import {identity, range} from "lodash";
import * as React from "react";
import {memorySize} from "../../utils/TransmissionUtils";
import {InfoFormComponent} from "../form-components/InfoFormComponent";
import {TransmissionTorrentProps} from "../TransmissionTorrent";

export class TorrentPiecesPanel extends React.PureComponent<TransmissionTorrentProps, {}> {
    render() {
        const pieces: boolean[] = this.pieces();

        return (
            <div className="torrent-panel container">
                <InfoFormComponent
                    label="Pieces"
                    infoValue={`${pieces.filter(identity).length} / ${pieces.length}`}
                />
                <InfoFormComponent
                    label="Piece size"
                    infoValue={memorySize(this.props.torrent.pieceSize)}
                />
                <div className="pieces-grid">
                    {pieces.map((have, index) => <div key={index} className={classNames("pieces-grid-item", {have: have})}/>)}
                </div>
            </div>
        );
    }

    private pieces = (): boolean[] => {
        const bits: string = atob(this.props.torrent.pieces);
        return range(this.props.torrent.pieceCount).map(index => this.havePiece(bits, index));
    }

    private havePiece = (bits: string, index: number): boolean => {
        return !!(bits.charCodeAt(index >> 3) & (1 << (7 - (index & 7))));
    }
}
