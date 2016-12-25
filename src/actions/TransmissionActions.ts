import {Action} from "redux";
import {Ids, Session, Torrent, TorrentRemoveArgs, TorrentRenamePathArgs, TorrentSetArgs, TorrentSetLocationArgs} from "../api/Transmission";

export const enum TransmissionActionType {
    SET_STATE_CONNECTED,
    SET_STATE_TORRENTS,
    SET_STATE_SESSION,
    SET_STATE_IS_PORT_OPEN,
    SET_STATE_UPDATING_BLOCKLIST,
    SET_STATE_TESTING_PORT,
    SET_STATE_ADD_TORRENTS_ERRORS,
    UPDATE_STATE_TORRENTS_INFO,
    UPDATE_STATE_TORRENTS_OPTIONS,
    UPDATE_STATE_SESSION,
    START_TORRENTS,
    START_TORRENTS_NOW,
    STOP_TORRENTS,
    VERIFY_TORRENTS,
    REANNOUNCE_TORRENTS,
    SET_TORRENTS,
    GET_TORRENTS,
    ADD_TORRENTS,
    REMOVE_TORRENTS,
    SET_TORRENT_LOCATION,
    RENAME_TORRENT_PATH,
    SET_SESSION,
    GET_SESSION,
    UPDATE_BLOCKLIST,
    TEST_PORT,
    MOVE_TOP_QUEUE,
    MOVE_UP_QUEUE,
    MOVE_DOWN_QUEUE,
    MOVE_BOTTOM_QUEUE,
}

export interface TransmissionAction<T> extends Action {
    type: TransmissionActionType;
    payload?: T;
}

export type TransmissionActionCreator<T> = (payload?: T) => TransmissionAction<T>;

export const setStateConnectedAction: TransmissionActionCreator<boolean> = (connected: boolean) => {
    return {
        type: TransmissionActionType.SET_STATE_CONNECTED,
        payload: connected,
    };
};

export const setStateTorrentsAction: TransmissionActionCreator<Torrent[]> = (torrents: Torrent[]) => {
    return {
        type: TransmissionActionType.SET_STATE_TORRENTS,
        payload: torrents,
    };
};

export const setStateSessionAction: TransmissionActionCreator<Session> = (session: Session) => {
    return {
        type: TransmissionActionType.SET_STATE_SESSION,
        payload: session,
    };
};

export const setStateIsPortOpenAction: TransmissionActionCreator<boolean> = (isPortOpen: boolean) => {
    return {
        type: TransmissionActionType.SET_STATE_IS_PORT_OPEN,
        payload: isPortOpen,
    };
};

export const setStateUpdatingBlocklistAction: TransmissionActionCreator<boolean> = (updatingBlocklist: boolean) => {
    return {
        type: TransmissionActionType.SET_STATE_UPDATING_BLOCKLIST,
        payload: updatingBlocklist,
    };
};

export const setStateTestingPortAction: TransmissionActionCreator<boolean> = (updatingBlocklist: boolean) => {
    return {
        type: TransmissionActionType.SET_STATE_TESTING_PORT,
        payload: updatingBlocklist,
    };
};

export const setStateAddTorrentsErrorsAction: TransmissionActionCreator<number> = (errors: number) => {
    return {
        type: TransmissionActionType.SET_STATE_ADD_TORRENTS_ERRORS,
        payload: errors,
    };
};

export const updateStateTorrentsInfoAction: TransmissionActionCreator<Torrent[]> = (torrents: Torrent[]) => {
    return {
        type: TransmissionActionType.UPDATE_STATE_TORRENTS_INFO,
        payload: torrents,
    };
};

export const updateStateTorrentsOptionsAction: TransmissionActionCreator<TorrentSetArgs> = (args: TorrentSetArgs) => {
    return {
        type: TransmissionActionType.UPDATE_STATE_TORRENTS_OPTIONS,
        payload: args,
    };
};

export const updateStateSessionAction: TransmissionActionCreator<Session> = (session: Session) => {
    return {
        type: TransmissionActionType.UPDATE_STATE_SESSION,
        payload: session,
    };
};

export const startTorrentsAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.START_TORRENTS,
        payload: ids,
    };
};

export const startTorrentsNowAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.START_TORRENTS_NOW,
        payload: ids,
    };
};

export const stopTorrentsAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.STOP_TORRENTS,
        payload: ids,
    };
};

export const verifyTorrentsAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.VERIFY_TORRENTS,
        payload: ids,
    };
};

export const reannounceTorrentsAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.REANNOUNCE_TORRENTS,
        payload: ids,
    };
};

export const setTorrentsAction: TransmissionActionCreator<TorrentSetArgs> = (args: TorrentSetArgs) => {
    return {
        type: TransmissionActionType.SET_TORRENTS,
        payload: args,
    };
};

export const getTorrentsAction: TransmissionActionCreator<boolean> = (forceUpdate: boolean) => {
    return {
        type: TransmissionActionType.GET_TORRENTS,
        payload: forceUpdate,
    };
};

export interface AddTorrentsPayload {
    url?: string;
    files?: FileList;
    downloadDir: string;
}

export const addTorrentsAction: TransmissionActionCreator<AddTorrentsPayload> = (payload: AddTorrentsPayload) => {
    return {
        type: TransmissionActionType.ADD_TORRENTS,
        payload: payload,
    };
};

export const removeTorrentsAction: TransmissionActionCreator<TorrentRemoveArgs> = (args: TorrentRemoveArgs) => {
    return {
        type: TransmissionActionType.REMOVE_TORRENTS,
        payload: args,
    };
};

export const setTorrentLocationAction: TransmissionActionCreator<TorrentSetLocationArgs> = (args: TorrentSetLocationArgs) => {
    return {
        type: TransmissionActionType.SET_TORRENT_LOCATION,
        payload: args,
    };
};

export const renameTorrentPathAction: TransmissionActionCreator<TorrentRenamePathArgs> = (args: TorrentRenamePathArgs) => {
    return {
        type: TransmissionActionType.RENAME_TORRENT_PATH,
        payload: args,
    };
};

export const setSessionAction: TransmissionActionCreator<Session> = (session: Session) => {
    return {
        type: TransmissionActionType.SET_SESSION,
        payload: session,
    };
};

export const getSessionAction: TransmissionActionCreator<never> = () => {
    return {
        type: TransmissionActionType.GET_SESSION,
    };
};

export const updateBlocklistAction: TransmissionActionCreator<never> = () => {
    return {
        type: TransmissionActionType.UPDATE_BLOCKLIST,
    };
};

export const testPortAction: TransmissionActionCreator<never> = () => {
    return {
        type: TransmissionActionType.TEST_PORT,
    };
};

export const moveTopQueueAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.MOVE_TOP_QUEUE,
        payload: ids,
    };
};

export const moveUpQueueAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.MOVE_UP_QUEUE,
        payload: ids,
    };
};

export const moveDownQueueAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.MOVE_DOWN_QUEUE,
        payload: ids,
    };
};

export const moveBottomQueueAction: TransmissionActionCreator<Ids> = (ids: Ids) => {
    return {
        type: TransmissionActionType.MOVE_BOTTOM_QUEUE,
        payload: ids,
    };
};
