import {TransmissionError} from "../models/TransmissionError";

export const enum ErrorType {
    OK = 0,
    TRACKER_WARNING = 1,
    TRACKER_ERROR = 2,
    LOCAL_ERROR = 3,
}

export interface File {
    bytesCompleted: number;
    length: number;
    name: string;
}

export interface FileStats {
    bytesCompleted: number;
    wanted: boolean;
    priority: number;
}

export type Id = number | string;

export type Ids = Id | Id[];

export interface Peer {
    address: string;
    clientName: string;
    clientIsChoked: boolean;
    clientIsInterested: boolean;
    flagStr: string;
    isDownloadingFrom: boolean;
    isEncrypted: boolean;
    isIncoming: boolean;
    isUploadingTo: boolean;
    isUTP: boolean;
    peerIsChoked: boolean;
    peerIsInterested: boolean;
    port: number;
    progress: number;
    rateToClient: number;
    rateToPeer: number;
}

export interface PeersFrom {
    fromCache: number;
    fromDht: number;
    fromIncoming: number;
    fromLpd: number;
    fromLtep: number;
    fromPex: number;
    fromTracker: number;
}

export const enum Priority {
    LOW = -1,
    NORMAL = 0,
    HIGH = 1,
}

export const enum ScheduleDay {
    SUN = 1 << 0,
    MON = 1 << 1,
    TUES = 1 << 2,
    WED = 1 << 3,
    THURS = 1 << 4,
    FRI = 1 << 5,
    SAT = 1 << 6,
    WEEKDAY = MON | TUES | WED | THURS | FRI,
    WEEKEND = SUN | SAT,
    ALL = WEEKDAY | WEEKEND,
}

export const enum SeedIdleMode {
    GLOBAL = 0,
    SINGLE = 1,
    UNLIMITED = 2,
}

export const enum SeedRatioMode {
    GLOBAL = 0,
    SINGLE = 1,
    UNLIMITED = 2,
}

export interface Session {
    "alt-speed-down"?: number;
    "alt-speed-enabled"?: boolean;
    "alt-speed-time-begin"?: number;
    "alt-speed-time-enabled"?: boolean;
    "alt-speed-time-end"?: number;
    "alt-speed-time-day"?: ScheduleDay;
    "alt-speed-up"?: number;
    "blocklist-url"?: string;
    "blocklist-enabled"?: boolean;
    "blocklist-size"?: number;
    "cache-size-mb"?: number;
    "config-dir"?: string;
    "download-dir"?: string;
    "download-queue-size"?: number;
    "download-queue-enabled"?: boolean;
    "dht-enabled"?: boolean;
    encryption?: string;
    "idle-seeding-limit"?: number;
    "idle-seeding-limit-enabled"?: boolean;
    "incomplete-dir"?: string;
    "incomplete-dir-enabled"?: boolean;
    "lpd-enabled"?: boolean;
    "peer-limit-global"?: number;
    "peer-limit-per-torrent"?: number;
    "pex-enabled"?: boolean;
    "peer-port"?: number;
    "peer-port-random-on-start"?: boolean;
    "port-forwarding-enabled"?: boolean;
    "queue-stalled-enabled"?: boolean;
    "queue-stalled-minutes"?: number;
    "rename-partial-files"?: boolean;
    "rpc-version"?: number;
    "rpc-version-minimum"?: number;
    "script-torrent-done-filename"?: string;
    "script-torrent-done-enabled"?: boolean;
    seedRatioLimit?: number;
    seedRatioLimited?: boolean;
    "seed-queue-size"?: number;
    "seed-queue-enabled"?: boolean;
    "speed-limit-down"?: number;
    "speed-limit-down-enabled"?: boolean;
    "speed-limit-up"?: number;
    "speed-limit-up-enabled"?: boolean;
    "start-added-torrents"?: boolean;
    "trash-original-torrent-files"?: boolean;
    units?: Units;
    "utp-enabled"?: boolean;
    version?: string;
}

export interface SessionStats {
    activeTorrentCount: number;
    downloadSpeed: number;
    pausedTorrentCount: number;
    torrentCount: number;
    uploadSpeed: number;
    "cumulative-stats": SessionStatsStats;
    "current-stats": SessionStatsStats;
}

export interface SessionStatsStats {
    uploadedBytes: number;
    downloadedBytes: number;
    filesAdded: number;
    sessionCount: number;
    secondsActive: number;
}

export const enum Status {
    STOPPED = 0,
    CHECK_WAIT = 1,
    CHECK = 2,
    DOWNLOAD_WAIT = 3,
    DOWNLOAD = 4,
    SEED_WAIT = 5,
    SEED = 6,
}

export interface Torrent {
    activityDate?: number;
    addedDate?: number;
    bandwidthPriority?: Priority;
    comment?: string;
    corruptEver?: number;
    creator?: string;
    dateCreated?: number;
    desiredAvailable?: number;
    doneDate?: number;
    downloadDir?: string;
    downloadedEver?: number;
    downloadLimit?: number;
    downloadLimited?: boolean;
    error?: ErrorType;
    errorString?: string;
    eta?: number;
    etaIdle?: number;
    files?: File[];
    fileStats?: FileStats[];
    hashString?: string;
    haveUnchecked?: number;
    haveValid?: number;
    honorsSessionLimits?: boolean;
    id?: number;
    isFinished?: boolean;
    isPrivate?: boolean;
    isStalled?: boolean;
    leftUntilDone?: number;
    magnetLink?: string;
    manualAnnounceTime?: number;
    maxConnectedPeers?: number;
    metadataPercentComplete?: number;
    name?: string;
    "peer-limit"?: number;
    peers?: Peer[];
    peersConnected?: number;
    peersFrom?: PeersFrom;
    peersGettingFromUs?: number;
    peersSendingToUs?: number;
    percentDone?: number;
    pieces?: string;
    pieceCount?: number;
    pieceSize?: number;
    priorities?: Priority[];
    queuePosition?: number;
    rateDownload?: number;
    rateUpload?: number;
    recheckProgress?: number;
    secondsDownloading?: number;
    secondsSeeding?: number;
    seedIdleLimit?: number;
    seedIdleMode?: SeedIdleMode;
    seedRatioLimit?: number;
    seedRatioMode?: SeedRatioMode;
    sizeWhenDone?: number;
    startDate?: number;
    status?: Status;
    trackers?: Tracker[];
    trackerStats?: TrackerStats[];
    totalSize?: number;
    torrentFile?: string;
    uploadedEver?: number;
    uploadLimit?: number;
    uploadLimited?: boolean;
    uploadRatio?: number;
    wanted?: boolean[];
    webseeds?: string[];
    webseedsSendingToUs?: number;
}

export interface Tracker {
    announce: string;
    id: number;
    scrape: string;
    tier: number;
}

export const enum TrackerState {
    INACTIVE = 0,
    WAITING = 1,
    QUEUED = 2,
    ACTIVE = 3,
}

export interface TrackerStats {
    announce: string;
    announceState: TrackerState;
    downloadCount: number;
    hasAnnounced: boolean;
    hasScraped: boolean;
    host: string;
    id: number;
    isBackup: boolean;
    lastAnnouncePeerCount: number;
    lastAnnounceResult: string;
    lastAnnounceStartTime: number;
    lastAnnounceSucceeded: boolean;
    lastAnnounceTime: number;
    lastAnnounceTimedOut: boolean;
    lastScrapeResult: string;
    lastScrapeStartTime: number;
    lastScrapeSucceeded: boolean;
    lastScrapeTime: number;
    lastScrapeTimedOut: boolean;
    leecherCount: number;
    nextAnnounceTime: number;
    nextScrapeTime: number;
    scrape: string;
    scrapeState: number;
    seederCount: number;
    tier: number;
}

export interface Units {
    "memory-bytes": number;
    "memory-units": [string, string, string, string];
    "size-bytes": number;
    "size-units": [string, string, string, string];
    "speed-bytes": number;
    "speed-units": [string, string, string, string];
}

export interface TorrentSetArgs {
    bandwidthPriority?: Priority;
    downloadLimit?: number;
    downloadLimited?: boolean;
    "files-wanted"?: number[];
    "files-unwanted"?: number[];
    honorsSessionLimits?: boolean;
    ids?: Ids;
    location?: string;
    "peer-limit"?: number;
    "priority-high"?: number[];
    "priority-low"?: number[];
    "priority-normal"?: number[];
    queuePosition?: number;
    seedIdleLimit?: number;
    seedIdleMode?: SeedIdleMode;
    seedRatioLimit?: number;
    seedRatioMode?: SeedRatioMode;
    trackerAdd?: string[];
    trackerRemove?: number[];
    trackerReplace?: [number, string][];
    uploadLimit?: number;
    uploadLimited?: boolean;
}

type TorrentGetField = keyof Torrent;

export interface TorrentGetArgs {
    torrents: Torrent[];
}

export interface TorrentAddRequestArgs {
    cookies?: string;
    "download-dir"?: string;
    filename?: string;
    metainfo?: string;
    paused?: boolean;
    "peer-limit"?: number;
    bandwidthPriority?: number;
    "files-wanted"?: number[];
    "files-unwanted"?: number[];
    "priority-high"?: number[];
    "priority-low"?: number[];
    "priority-normal"?: number[];
}

export interface TorrentAddResponseArgs {
    "torrent-added"?: Torrent;
    "torrent-duplicate"?: Torrent;
}

export interface TorrentRemoveArgs {
    ids?: Ids;
    "delete-local-data"?: boolean;
}

export interface TorrentSetLocationArgs {
    ids?: Ids;
    location: string;
    move?: boolean;
}

export interface TorrentRenamePathArgs {
    ids: Id;
    path: string;
    name: string;
}

export interface BlocklistUpdateArgs {
    "blocklist-size": number;
}

export interface PortTestArgs {
    "port-is-open": boolean;
}

export interface FreeSpaceArgs {
    path: string;
    "size-bytes": number;
}

export interface TransmissionRequest {
    method: string;
    arguments?: any;
    tag?: number;
}

export interface TransmissionResponse {
    result: string;
    arguments?: any;
    tag?: number;
}

export class Transmission {
    private tag: number = 0;
    private sessionId: string;

    torrentStart = (ids?: Ids): void => {
        this.fetch("torrent-start", {
            ids: ids,
        });
    }

    torrentStartNow = (ids?: Ids): void => {
        this.fetch("torrent-start-now", {
            ids: ids,
        });
    }

    torrentStop = (ids?: Ids): void => {
        this.fetch("torrent-stop", {
            ids: ids,
        });
    }

    torrentVerify = (ids?: Ids): void => {
        this.fetch("torrent-verify", {
            ids: ids,
        });
    }

    torrentReannounce = (ids?: Ids): void => {
        this.fetch("torrent-reannounce", {
            ids: ids,
        });
    }

    torrentSet = (args: TorrentSetArgs): void => {
        this.fetch("torrent-set", args);
    }

    torrentGet = (fields: TorrentGetField[], ids?: Ids): Promise<TorrentGetArgs> => {
        return this.fetch("torrent-get", {
            ids: ids,
            fields: fields,
        });
    }

    torrentAdd = (args: TorrentAddRequestArgs): Promise<TorrentAddResponseArgs> => {
        return this.fetch("torrent-add", args);
    }

    torrentRemove = (args: TorrentRemoveArgs): void => {
        this.fetch("torrent-remove", args);
    }

    torrentSetLocation = (args: TorrentSetLocationArgs): void => {
        this.fetch("torrent-set-location", args);
    }

    torrentRenamePath = (args: TorrentRenamePathArgs): Promise<TorrentRenamePathArgs> => {
        return this.fetch("torrent-rename-path", args);
    }

    sessionSet = (args: Session): void => {
        this.fetch("session-set", args);
    }

    sessionGet = (): Promise<Session> => {
        return this.fetch("session-get");
    }

    sessionStats = (): Promise<SessionStats> => {
        return this.fetch("session-stats");
    }

    blocklistUpdate = (): Promise<BlocklistUpdateArgs> => {
        return this.fetch("blocklist-update");
    }

    portTest = (): Promise<PortTestArgs> => {
        return this.fetch("port-test");
    }

    sessionClose = (): void => {
        this.fetch("session-close");
    }

    queueMoveTop = (ids: Ids): void => {
        this.fetch("queue-move-top", {
            ids: ids,
        });
    }

    queueMoveUp = (ids: Ids): void => {
        this.fetch("queue-move-up", {
            ids: ids,
        });
    }

    queueMoveDown = (ids: Ids): void => {
        this.fetch("queue-move-down", {
            ids: ids,
        });
    }

    queueMoveBottom = (ids: Ids): void => {
        this.fetch("queue-move-bottom", {
            ids: ids,
        });
    }

    freeSpace = (path: string): Promise<FreeSpaceArgs> => {
        return this.fetch("free-space", {
            path: path,
        });
    }

    private fetch = async (method: string, args?: any): Promise<any> => {
        const transmissionRequest: TransmissionRequest = {
            method: method,
            arguments: args,
            tag: this.tag++,
        };

        const request: Request = new Request("../rpc", {
            method: "POST",
            body: JSON.stringify(transmissionRequest),
            credentials: "same-origin",
        });
        if (this.sessionId) {
            request.headers.append("X-Transmission-Session-Id", this.sessionId);
        }

        const response: Response = await fetch(request);
        if (response.status === 409) {
            this.sessionId = response.headers.get("X-Transmission-Session-Id");
            return this.fetch(method, args);
        } else if (!response.ok) {
            throw new Error(`Invalid response: ${response.status} (${response.statusText})`);
        }

        const transmissionResponse: TransmissionResponse = await response.json();
        if (transmissionResponse.result !== "success") {
            throw new TransmissionError(`Unsuccessful request: ${transmissionResponse.result}`);
        }

        return transmissionResponse.arguments;
    }
}
