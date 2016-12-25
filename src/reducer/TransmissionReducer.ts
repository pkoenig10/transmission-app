import {pick} from "lodash";
import {Reducer} from "redux";
import {TransmissionAction, TransmissionActionType} from "../actions/TransmissionActions";
import {Priority, Torrent, TorrentSetArgs} from "../api/Transmission";
import {torrentGetOptionsFields} from "../sagas/TransmissionSagas";
import {TransmissionState} from "../state/TransmissionState";
import {findTorrent, includesTorrent} from "../utils/TransmissionUtils";

export const transmissionReducer: Reducer<TransmissionState> = (state: TransmissionState, action: TransmissionAction<any>) => {
    switch (action.type) {
        case TransmissionActionType.SET_STATE_CONNECTED:
            return {
                ...state,
                connected: action.payload,
            };

        case TransmissionActionType.SET_STATE_TORRENTS:
            return {
                ...state,
                torrents: action.payload,
            };

        case TransmissionActionType.SET_STATE_SESSION:
            return {
                ...state,
                session: action.payload,
            };

        case TransmissionActionType.SET_STATE_IS_PORT_OPEN:
            return {
                ...state,
                isPortOpen: action.payload,
            };

        case TransmissionActionType.SET_STATE_UPDATING_BLOCKLIST:
            return {
                ...state,
                updatingBlocklist: action.payload,
            };

        case TransmissionActionType.SET_STATE_TESTING_PORT:
            return {
                ...state,
                testingPort: action.payload,
            };

        case TransmissionActionType.SET_STATE_ADD_TORRENTS_ERRORS:
            return {
                ...state,
                addTorrentsErrors: action.payload,
            };

        case TransmissionActionType.UPDATE_STATE_TORRENTS_INFO:
            return {
                ...state,
                torrents: updateTorrentsInfo(state.torrents, action.payload),
            };

        case TransmissionActionType.UPDATE_STATE_TORRENTS_OPTIONS:
            return {
                ...state,
                torrents: updateTorrentsOptions(state.torrents, action.payload),
            };

        case TransmissionActionType.UPDATE_STATE_SESSION:
            return {
                ...state,
                session: {
                    ...state.session,
                    ...action.payload,
                },
            };

        default:
            return state;
    }
};

function updateTorrentsInfo(torrents: Torrent[], newTorrents: Torrent[]): Torrent[] {
    return newTorrents.map(newTorrent => {
        const torrent: Torrent = findTorrent(torrents, newTorrent.hashString);
        return {
            ...newTorrent,
            ...pick(torrent, torrentGetOptionsFields),
        };
    });
}

function updateTorrentsOptions(torrents: Torrent[], args: TorrentSetArgs): Torrent[] {
    return torrents.map(torrent => {
        return includesTorrent(args.ids, torrent.hashString) ? updateTorrentOptions(torrent, args) : torrent;
    });
}

function updateTorrentOptions(torrent: Torrent, args: TorrentSetArgs): Torrent {
    return {
        ...torrent,
        ...pick(args, torrentGetOptionsFields),
        priorities: updateTorrentPriorities(torrent.priorities.slice(0), args),
        wanted: updateTorrentWanted(torrent.wanted.slice(0), args),
    };
}

function updateTorrentPriorities(priorities: Priority[], args: TorrentSetArgs): Priority[] {
    updateTorrentPrioritiesFiles(priorities, args["priority-low"], Priority.LOW);
    updateTorrentPrioritiesFiles(priorities, args["priority-normal"], Priority.NORMAL);
    updateTorrentPrioritiesFiles(priorities, args["priority-high"], Priority.HIGH);
    return priorities;
}

function updateTorrentPrioritiesFiles(priorities: Priority[], files: number[], priority: Priority): void {
    if (files) {
        files.forEach(file => priorities[file] = priority);
    }
}

function updateTorrentWanted(wanted: boolean[], args: TorrentSetArgs): boolean[] {
    updateTorrentWantedFiles(wanted, args["files-wanted"], true);
    updateTorrentWantedFiles(wanted, args["files-unwanted"], false);
    return wanted;
}

function updateTorrentWantedFiles(wanted: boolean[], files: number[], isWanted: boolean): void {
    if (files) {
        files.forEach(file => wanted[file] = isWanted);
    }
}
