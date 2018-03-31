[![Build Status](https://travis-ci.org/nodejayes/logwriter.svg?branch=master)](https://travis-ci.org/nodejayes/logwriter)
[![Coverage Status](https://coveralls.io/repos/github/nodejayes/logwriter/badge.svg?branch=master)](https://coveralls.io/github/nodejayes/logwriter?branch=master)

### Logwriter

Simply Logfile writer that write Logfiles async. First all incoming Logs are write in Memory than an Interval writes the Memory to a Logfile and clears it.

### Features

| Feature         | Description                                | State  |
|-----------------|--------------------------------------------|--------|
| Folder creation | create Logfile and Folders when not exists | stable |
| Logrotate       | create new Logfile when limit is reached   | stable |
| Loglevel        | DEBUG, INFO, WARNING and ERROR Flag        | stable |

### Usage

```Javascript
const LOGGER = require('./../index');

let l = new LOGGER({
    logfilepath: __dirname + '/logs/logfile.log',
    maxfilesize: 20
});
```

### Options

| Option   | Description                                                        |
|----------|--------------------------------------------------------------------|
| path     | the Path of the Logfile                                            |
| maxsize  | maximum Size of one Logfile in MB                                  |
| loglevel | Level of Logfile 1 => ERROR, 2 => WARNING, 3 => INFO or 4 => DEBUG |
| synctime | time in ms when the Logger writes to File                          |
| encoding | Logfile Encoding                                                   |