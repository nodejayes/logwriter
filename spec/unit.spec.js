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
            loglevel: 4
        });
    });

    it('log debug', (done) => {
        l.debug('DEBUG MESSAGE');
        setTimeout(() => {
            assert.equal(readFileSync(LOGFILE).toString('utf8').includes('DEBUG MESSAGE'), true);
            done();
        }, 2000);
    });

    it('log info', (done) => {
        l.info('INFO MESSAGE');
        setTimeout(() => {
            assert.equal(readFileSync(LOGFILE).toString('utf8').includes('INFO MESSAGE'), true);
            done();
        }, 2000);
    });

    it('log warning', (done) => {
        l.warning('WARNING MESSAGE');
        setTimeout(() => {
            assert.equal(readFileSync(LOGFILE).toString('utf8').includes('WARNING MESSAGE'), true);
            done();
        }, 2000);
    });

    it('log error', (done) => {
        l.error('ERROR MESSAGE');
        setTimeout(() => {
            assert.equal(readFileSync(LOGFILE).toString('utf8').includes('ERROR MESSAGE'), true);
            done();
        }, 2000);
    });

    it('close LogWriter', () => {
        l.close();
    })
});