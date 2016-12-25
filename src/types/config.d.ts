declare const config: Config;

interface Config {
    downloadDirs?: DownloadDir[];
}

interface DownloadDir {
    name: string;
    path: string;
}
