const {unlinkSync, readFileSync} = require('fs');
const {join} = require('path');
const {assert} = require('chai');
const LOGGER = require('./../index');

const LOGFILE = join(__dirname, 'logs', 'logfile.log');
let l = null;

describe('LogWriter Spec', () => {
    after(() => {
        unlinkSync(LOGFILE);
    });

    it('construct LogWriter instance', () => {
        l = new LOGGER({
            logfilepath: LOGFILE,
            maxfilesize: 20,
            loglevel: 1
        });
    });

    it('log debug', async () => {
        l.debug('DEBUG MESSAGE');
        await setTimeout(() => {}, 5000);
        assert.equal(readFileSync(LOGFILE).toString('utf8').includes('DEBUG MESSAGE'), true);
    });

    it('log info', async () => {
        l.debug('INFO MESSAGE');
        await setTimeout(() => {}, 5000);
        assert.equal(readFileSync(LOGFILE).toString('utf8').includes('INFO MESSAGE'), true);
    });

    it('log warning', async () => {
        l.debug('WARNING MESSAGE');
        await setTimeout(() => {}, 2000);
        assert.equal(readFileSync(LOGFILE).toString('utf8').includes('WARNING MESSAGE'), true);
    });

    it('log error', async () => {
        l.debug('ERROR MESSAGE');
        await setTimeout(() => {}, 2000);
        assert.equal(readFileSync(LOGFILE).toString('utf8').includes('ERROR MESSAGE'), true);
    });
});