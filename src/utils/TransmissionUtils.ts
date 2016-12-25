import * as dateFormat from "dateformat";
import {without, zipWith} from "lodash";
import {ErrorType, Ids, Status, Torrent} from "../api/Transmission";

const sizeUnits: string[] = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const durationUnits: string[] = ["w", "d", "h", "m", "s"];

export function fileSize(bytes: number): string {
    return size(bytes, 1000, 1);
}

export function memorySize(bytes: number): string {
    return size(bytes, 1024, 0);
}

export function speedSize(bytes: number): string {
    return size(bytes, 1000, 0) + "/s";
}

function size(bytes: number, base: number, digits: number): string {
    if (bytes === undefined) {
        return undefined;
    }

    const exponent: number = bytes ? Math.floor(Math.log(bytes) / Math.log(base)) : 0;
    const value: string = (bytes / Math.pow(base, exponent)).toFixed(digits);
    const unit: string = sizeUnits[exponent];
    return `${value} ${unit}`;
}

export function percent(percent: number, digits: number = 0): string {
    const power: number = Math.pow(10, digits);
    return (Math.floor(power * 100 * (percent || 0)) / power) + "%";
}

export function datetime(datetime: number): string {
    return datetime ? dateFormat(1000 * datetime, "mmm d h:MM:ss TT") : undefined;
}

export function duration(duration: number): string {
    if (duration < 0) {
        return "∞";
    }

    if (duration === 0) {
        return "0s";
    }

    const weeks: number = Math.floor(duration / 604800);
    const days: number = Math.floor(duration / 86400) % 7;
    const hours: number = Math.floor(duration / 3600) % 24;
    const minutes: number = Math.floor(duration / 60) % 60;
    const seconds: number = duration % 60;
    const durationValues: number[] = [weeks, days, hours, minutes, seconds];
    return without(zipWith(durationValues, durationUnits, (value: number, unit: string) => value ? `${value}${unit}` : undefined), undefined).join(" ");
}

export function status(torrent: Torrent): string {
    switch (torrent.error) {
        case ErrorType.TRACKER_WARNING:
            return "Tracker warning";
        case ErrorType.TRACKER_ERROR:
            return "Tracker error";
        case ErrorType.LOCAL_ERROR:
            return "Error";
    }

    switch (torrent.status) {
        case Status.STOPPED:
            return torrent.percentDone < 1 ? "Paused" : "Finished";
        case Status.CHECK:
            return `Checking files (${percent(torrent.recheckProgress)})`;
        case Status.CHECK_WAIT:
            return "Queued for checking files";
        case Status.DOWNLOAD:
            return torrent.metadataPercentComplete < 1 ? `Downloading metadata (${percent(torrent.metadataPercentComplete)})` : "Downloading";
        case Status.DOWNLOAD_WAIT:
            return "Queued for downloading";
        case Status.SEED:
            return "Seeding";
        case Status.SEED_WAIT:
            return "Queued for seeding";
    }
}

export function progress(torrent: Torrent): string {
    const have: number = torrent.haveValid + torrent.haveUnchecked;
    return `${fileSize(have)} / ${fileSize(torrent.sizeWhenDone)} (${percent(have / torrent.sizeWhenDone)})`;
}

export function peers(torrent: Torrent): number {
    switch (torrent.status) {
        case Status.DOWNLOAD:
            return torrent.peersSendingToUs;
        case Status.SEED:
            return torrent.peersGettingFromUs;
        default:
            return 0;
    }
}

export function includesTorrent(ids: Ids, hashString: string): boolean {
    return ids instanceof Array ? ids.includes(hashString) : ids === undefined || hashString === ids;
}

export function findTorrent(torrents: Torrent[] = [], hashString: string): Torrent {
    return torrents.find(torrent => torrent.hashString === hashString);
}
