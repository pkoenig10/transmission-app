import {Session, Torrent} from "../api/Transmission";

export interface TransmissionState {
    connected: boolean;
    torrents: Torrent[];
    session: Session;
    isPortOpen: boolean;
    updatingBlocklist: boolean;
    testingPort: boolean;
    addTorrentsErrors: number;
}

export const initialTransmissionState: TransmissionState = {
    connected: true,
    torrents: undefined,
    session: undefined,
    isPortOpen: undefined,
    updatingBlocklist: false,
    testingPort: false,
    addTorrentsErrors: undefined,
};
