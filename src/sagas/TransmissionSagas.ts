import {isError, range} from "lodash";
import {delay} from "redux-saga";
import {CallEffect, CallEffectArg, CallFuncRest, actionChannel, call, put, race, take} from "redux-saga/effects";
import {AddTorrentsPayload, TransmissionAction, TransmissionActionType, getSessionAction, getTorrentsAction, setStateAddTorrentsErrorsAction, setStateConnectedAction, setStateIsPortOpenAction, setStateSessionAction, setStateTestingPortAction, setStateTorrentsAction, setStateUpdatingBlocklistAction, updateStateSessionAction, updateStateTorrentsInfoAction} from "../actions/TransmissionActions";
import {BlocklistUpdateArgs, PortTestArgs, Session, TorrentGetArgs, TorrentSetArgs, Transmission} from "../api/Transmission";
import {TransmissionError} from "../models/TransmissionError";

export const torrentGetInfoFields: string[] = [
    "addedDate",
    "desiredAvailable",
    "doneDate",
    "error",
    "errorString",
    "eta",
    "etaIdle",
    "files",
    "hashString",
    "haveUnchecked",
    "haveValid",
    "isFinished",
    "magnetLink",
    "metadataPercentComplete",
    "name",
    "peers",
    "peersConnected",
    "peersGettingFromUs",
    "peersSendingToUs",
    "percentDone",
    "pieces",
    "pieceCount",
    "pieceSize",
    "priorities",
    "queuePosition",
    "rateDownload",
    "rateUpload",
    "recheckProgress",
    "secondsDownloading",
    "secondsSeeding",
    "sizeWhenDone",
    "status",
    "trackerStats",
    "uploadRatio",
    "wanted",
];
export const torrentGetOptionsFields: string[] = [
    "bandwidthPriority",
    "downloadDir",
    "downloadLimit",
    "downloadLimited",
    "honorsSessionLimits",
    "peer-limit",
    "seedIdleLimit",
    "seedIdleMode",
    "seedRatioLimit",
    "seedRatioMode",
    "uploadLimit",
    "uploadLimited",
];
export const torrentGetFields: string[] = torrentGetInfoFields.concat(torrentGetOptionsFields);

const transmission: Transmission = new Transmission();

type Saga = (...args: any[]) => IterableIterator<any>;

function transmissionActionChannel(actionType: TransmissionActionType) {
    return actionChannel((action: TransmissionAction<any>) => action.type === actionType);
}

export function* rootSaga() {
    while (true) {
        try {
            yield* getSession();
            yield put(setStateConnectedAction(true));
            yield [
                startTorrentsSaga(),
                startTorrentsNowSaga(),
                stopTorrentsSaga(),
                verifyTorrentsSaga(),
                reannounceTorrentsSaga(),
                setTorrentsSaga(),
                getTorrentsSaga(),
                addTorrentsSaga(),
                removeTorrentsSaga(),
                setTorrentLocationSaga(),
                renameTorrentPathSaga(),
                setSessionSaga(),
                getSessionSaga(),
                updateBlocklistSaga(),
                testPortSaga(),
                moveTopQueueSaga(),
                moveUpQueueSaga(),
                moveDownQueueSaga(),
                moveBottomQueueSaga(),
            ];
        } catch (e) {
            yield put(setStateConnectedAction(false));
            yield call(delay, 5000);
        }
    }
}

function* transmissionSaga(trySaga: Saga, finallySaga?: Saga) {
    try {
        yield* trySaga();
    } catch (e) {
        if (e instanceof TransmissionError) {
            // Don't throw error if it is a TransmissionError
        } else {
            throw e;
        }
    } finally {
        if (finallySaga) {
            yield* finallySaga();
        }
    }
}

function* transmissionAddTorrentSaga(trySaga: Saga) {
    try {
        yield* trySaga();
    } catch (e) {
        return e;
    }
}

function* torrentsSaga(actionType: TransmissionActionType, api: CallEffectArg<CallFuncRest>, ...args: any[]) {
    const channel = yield transmissionActionChannel(actionType);
    while (true) {
        const action: TransmissionAction<any> = yield take(channel);
        yield* transmissionSaga(function* () {
            yield call(api, action.payload, ...args);
            yield put(getTorrentsAction(false));
        });
    }
}

function* startTorrentsSaga() {
    yield* torrentsSaga(TransmissionActionType.START_TORRENTS, transmission.torrentStart);
}

function* startTorrentsNowSaga() {
    yield* torrentsSaga(TransmissionActionType.START_TORRENTS_NOW, transmission.torrentStartNow);
}

function* stopTorrentsSaga() {
    yield* torrentsSaga(TransmissionActionType.STOP_TORRENTS, transmission.torrentStop);
}

function* verifyTorrentsSaga() {
    yield* torrentsSaga(TransmissionActionType.VERIFY_TORRENTS, transmission.torrentVerify);
}

function* reannounceTorrentsSaga() {
    yield* torrentsSaga(TransmissionActionType.REANNOUNCE_TORRENTS, transmission.torrentReannounce);
}

function* setTorrentsSaga() {
    const setTorrentsChannel = yield transmissionActionChannel(TransmissionActionType.SET_TORRENTS);
    while (true) {
        const action: TransmissionAction<TorrentSetArgs> = yield take(setTorrentsChannel);
        yield* transmissionSaga(function* () {
            yield call(transmission.torrentSet, action.payload);
            yield put(getTorrentsAction(true));
        });
    }
}

function* getTorrentsSaga() {
    const getTorrentsChannel = yield transmissionActionChannel(TransmissionActionType.GET_TORRENTS);
    let forceUpdate: boolean = true;
    while (true) {
        const actionCreator = forceUpdate ? setStateTorrentsAction : updateStateTorrentsInfoAction;
        yield* transmissionSaga(function* () {
            const args: TorrentGetArgs = yield call(transmission.torrentGet, torrentGetFields);
            yield put(actionCreator(args.torrents));
        });
        const {action} = yield race({
            delay: call(delay, 1000),
            action: take(getTorrentsChannel),
        });
        forceUpdate = action ? action.payload : false;
    }
}

function* addTorrentsSaga() {
    const addTorrentsChannel = yield transmissionActionChannel(TransmissionActionType.ADD_TORRENTS);
    while (true) {
        const action: TransmissionAction<AddTorrentsPayload> = yield take(addTorrentsChannel);
        const {url, files, downloadDir} = action.payload;

        const effects: CallEffect[] = [];
        if (url) {
            effects.push(call(addTorrentUrl, url, downloadDir));
        }
        if (files) {
            effects.push(...range(files.length).map(index => call(addTorrentFile, files[index], downloadDir)));
        }

        const errors: number = (yield effects).filter(isError).length;
        yield put(setStateAddTorrentsErrorsAction(errors));
    }
}

function* addTorrentUrl(url: string, downloadDir: string) {
    return yield* transmissionAddTorrentSaga(function* () {
        yield call(transmission.torrentAdd, {
            filename: url,
            "download-dir": downloadDir,
        });
    });
}

function* addTorrentFile(file: File, downloadDir: string) {
    return yield* transmissionAddTorrentSaga(function* () {
        const metainfo: string = yield call(readTorrentFile, file);
        yield call(transmission.torrentAdd, {
            metainfo: metainfo,
            "download-dir": downloadDir,
        });
    });
}

function readTorrentFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (file.type !== "application/x-bittorrent") {
            return reject(new Error("Invalid file type"));
        }

        const reader: FileReader = new FileReader();
        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };
        reader.onload = () => {
            const index: number = reader.result.indexOf(",");
            if (index < 0) {
                return reject(new Error("Invalid file"));
            }
            resolve(reader.result.substring(index + 1));
        };

        reader.readAsDataURL(file);
    });
}

function* removeTorrentsSaga() {
    yield* torrentsSaga(TransmissionActionType.REMOVE_TORRENTS, transmission.torrentRemove);
}

function* setTorrentLocationSaga() {
    yield* torrentsSaga(TransmissionActionType.SET_TORRENT_LOCATION, transmission.torrentSetLocation);
}

function* renameTorrentPathSaga() {
    yield* torrentsSaga(TransmissionActionType.RENAME_TORRENT_PATH, transmission.torrentRenamePath);
}

function* setSessionSaga() {
    const setSessionChannel = yield transmissionActionChannel(TransmissionActionType.SET_SESSION);
    while (true) {
        const action: TransmissionAction<Session> = yield take(setSessionChannel);
        yield* transmissionSaga(function* () {
            yield call(transmission.sessionSet, action.payload);
            yield put(getSessionAction());
        });
    }
}

function* getSessionSaga() {
    const getSessionChannel = yield transmissionActionChannel(TransmissionActionType.GET_SESSION);
    while (true) {
        yield take(getSessionChannel);
        yield* getSession();
    }
}

function* getSession() {
    yield* transmissionSaga(function* () {
        const session: Session = yield call(transmission.sessionGet);
        yield put(setStateSessionAction(session));
    });
}

function* updateBlocklistSaga() {
    const updateBlocklistChannel = yield transmissionActionChannel(TransmissionActionType.UPDATE_BLOCKLIST);
    while (true) {
        yield take(updateBlocklistChannel);
        yield* transmissionSaga(function* () {
            yield put(setStateUpdatingBlocklistAction(true));
            const args: BlocklistUpdateArgs = yield call(transmission.blocklistUpdate);
            yield put(updateStateSessionAction(args));
        }, function* () {
            yield put(setStateUpdatingBlocklistAction(false));
        });
    }
}

function* testPortSaga() {
    const testPortChannel = yield transmissionActionChannel(TransmissionActionType.TEST_PORT);
    while (true) {
        yield take(testPortChannel);
        yield* transmissionSaga(function* () {
            yield put(setStateTestingPortAction(true));
            const args: PortTestArgs = yield call(transmission.portTest);
            yield put(setStateIsPortOpenAction(args["port-is-open"]));
        }, function* () {
            yield put(setStateTestingPortAction(false));
        });
    }
}

function* moveTopQueueSaga() {
    yield* torrentsSaga(TransmissionActionType.MOVE_TOP_QUEUE, transmission.queueMoveTop);
}

function* moveUpQueueSaga() {
    yield* torrentsSaga(TransmissionActionType.MOVE_UP_QUEUE, transmission.queueMoveUp);
}

function* moveDownQueueSaga() {
    yield* torrentsSaga(TransmissionActionType.MOVE_DOWN_QUEUE, transmission.queueMoveDown);
}

function* moveBottomQueueSaga() {
    yield* torrentsSaga(TransmissionActionType.MOVE_BOTTOM_QUEUE, transmission.queueMoveBottom);
}
