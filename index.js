'use strict';

const FS    = require('fs');
const PATH  = require('path');
const OS    = require('os');
const UTIL  = require('util');
const CACHE = [];
const FLAGS = Object.freeze({
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
});

const fillNull = function (val, num) {
    let tmp = val.toString();
    if (tmp.length >= num) {
        return tmp;
    }
    let diff = num - tmp.length;
    let prea = '';
    for (let i = 0; i < diff; i++) {
        prea += '0';
    }
    return prea + tmp;
};

const getTimestamp = function (format, pre) {
    let now = new Date();
    if (typeof pre !== typeof '') {
        return UTIL.format(format,
            '', 
            fillNull(now.getFullYear(), 4),
            fillNull(now.getMonth() + 1, 2),
            fillNull(now.getDate(), 2),
            fillNull(now.getHours(), 2),
            fillNull(now.getMinutes(), 2),
            fillNull(now.getSeconds(), 2),
            fillNull(now.getMilliseconds(), 3));
    } else {
        return UTIL.format(format,
            pre, 
            fillNull(now.getFullYear(), 4),
            fillNull(now.getMonth() + 1, 2),
            fillNull(now.getDate(), 2),
            fillNull(now.getHours(), 2),
            fillNull(now.getMinutes(), 2),
            fillNull(now.getSeconds(), 2),
            fillNull(now.getMilliseconds(), 3));
    }
};

const createDirectory = function (dirname) {
    const tmp = dirname.split(PATH.sep);
    let currentPath = '';
    for (let i = 0, length = tmp.length; i < length; i++) {
        currentPath += tmp[i] + PATH.sep;
        try {
            FS.statSync(currentPath);
        } catch (err) {
            FS.mkdirSync(currentPath);
        }
    }
};

const createFileIfNotExists = function () {
    let path = this.path;
    try {
        FS.statSync(path);
    } catch (err) {
        const dirname = PATH.dirname(path);
        try {
            FS.statSync(dirname);
        } catch (err) {
            createDirectory(dirname);
        }
        FS.writeFileSync(path, '', {encoding:this.encoding, flag: 'w'});
    }
};

const checkFileSize = function () {
    try {
        let stat = FS.statSync(this.path);
        let currentSize = (stat.size / 1024) / 1024;
        if (currentSize >= this.maxsize) {
            let extension = PATH.extname(this.path);
            let merge = UTIL.format('_%s%s', getTimestamp(this.timestampformatfile), extension);
            let newfile = this.path.split(extension).join(merge);
            FS.renameSync(this.path, newfile);
            createFileIfNotExists.bind(this)();
        }
    } catch (err) {
        throw err;
    }
};

const writeFile = function (data, idx) {
    createFileIfNotExists.bind(this)();
    checkFileSize.bind(this)();
    try {
        FS.writeFileSync(this.path, data, {encoding: this.encoding, flag: 'a+'});
        CACHE.splice(idx, 1);
    } catch (err) {
        throw err;
    }
};

const writeCacheToFile = function () {
    let i = 0;
    while (i < CACHE.length) {
        writeFile.bind(this)(CACHE[i], i);
        i++;
    }
};

const writeCache = function (msg, type) {
    if (!(msg instanceof String)) {
        msg = JSON.stringify(msg);
    }
    CACHE.push(UTIL.format('%s%s%s',
        getTimestamp(this.timestampformat, type),
        msg, OS.EOL));
};

class LogWriter {
    constructor (options) {
        this.path = options.logfilepath;
        if (typeof this.path !== typeof '' || this.path.length < 1) {
            throw new Error('no Logfile Path set');
        }
        this.loglevel = options.loglevel || 4;
        this.maxsize = options.maxfilesize || 20;
        this.encoding = options.encoding || 'utf8';
        this.synctime = options.synctime || 1000;
        this.timestampformat = '[%s %s-%s-%s %s:%s:%s.%s]: ';
        this.timestampformatfile = '%s-%s-%s_%s-%s-%s-%s';

        createFileIfNotExists.bind(this)();
        setInterval(writeCacheToFile.bind(this), this.synctime);
    }

    debug (msg) {
        if (this.loglevel === 4) {
            writeCache.bind(this)(msg, FLAGS.DEBUG);
        }
    }

    info (msg) {
        if (this.loglevel >= 3) {
            writeCache.bind(this)(msg, FLAGS.INFO);
        }
    }

    warning (msg) {
        if (this.loglevel >= 2) {
            writeCache.bind(this)(msg, FLAGS.WARNING);
        }
    }

    error (msg) {
        if (this.loglevel >= 1) {
            writeCache.bind(this)(msg, FLAGS.ERROR);
        }
    }
}

module.exports = LogWriter;