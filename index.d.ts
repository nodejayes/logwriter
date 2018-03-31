export enum Levels {
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4
}

export interface LoggerOptions {
    logfilepath: string;
    loglevel?: Levels;
    maxfilesize?: number;
    encoding?: string;
    synctime?: number;
}

export declare class LogWriter {
    constructor(options: LoggerOptions);
    debug(msg: string): void;
    info(msg: string): void;
    warning(msg: string): void;
    error(msg: string): void;
}