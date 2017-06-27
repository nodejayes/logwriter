'use strict';

const LOGGER = require('./../index');

let l = new LOGGER({
    logfilepath: __dirname + '/logs/logfile.log',
    maxfilesize: 20,
    loglevel: 5
});

function randomInt (min, max) {
    return Math.floor((Math.random() * max) + min);
}

function randomString () {
    let result = '';
    let words = randomInt(1, 20);
    for (let i = 0; i < words; i++) {
        let letters = randomInt(1, 20);
        for (let j = 0; j < letters; j++) {
            let ascii = randomInt(100, 172);
            result += String.fromCharCode(ascii);
        }
        result += ' ';
    }
    return result;
}

function randomType () {
    return randomInt(1, 4);
}

setInterval(function () {
    switch (randomType()) {
        case 1:
            l.error(randomString());
            break;
        case 2:
            l.warning(randomString());
            break;
        case 3:
            l.info(randomString());
            break;
        case 4:
            l.debug(randomString());
            break;
    }
}, 100);