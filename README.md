![LogMoon Logo](https://vectr.com/russoedu/eyLOsitfC.svg?width=128&select=eyLOsitfCpage0)


[![Dependencies Status](https://david-dm.org/russoedu/logmoon/status.svg)](https://david-dm.org/russoedu/logmoon)
[![DevDependencies Status](https://david-dm.org/russoedu/logmoon/dev-status.svg)](https://david-dm.org/russoedu/logmoon?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/russoedu/logmoon/badge.svg?branch=master)](https://coveralls.io/github/russoedu/logmoon?branch=master)
[![Build Status](https://travis-ci.org/russoedu/logmoon.svg?branch=master)](https://travis-ci.org/russoedu/logmoon)

# LogMoon
LogMoon is real time HTTP log monitoring CLI. It will display access stats in a determined frquency and alert you if a chosen access limit is reached in 2 minutes.

## Installation

You can install LogMoon as a global NPM package by running
```
npm i -g logmoon
```

LogMoon will be installed and will be available globally in your terminal.

## Configuration

LogMoon has 3 configurations that can be changed via environment variables (instructions: [Windows](https://docs.oracle.com/en/database/oracle/r-enterprise/1.5.1/oread/creating-and-modifying-environment-variables-on-windows.html#GUID-DD6F9982-60D5-48F6-8270-A27EC53807D0) | [Unix](https://www.cyberciti.biz/faq/set-environment-variable-unix/)):

### 1. ```STATS_DISPLAY_INTERVAL``` (seconds)

The interval to display access information (TODO).

*Default value is 10.* (Access information is displayed every 10 seconds);

### 2. ```REQUESTS_PER_SECOND_ALARM``` (requests per second)

The number of requestes per second threshold witch will display an alert when reached.

*Default value is 10.* (Alert is displayed if 10 or more requests per second are made in the past 2 minutes).

### 3. ```LOG_FILE_LOCATION``` (location)

The location of the [W3C-formatted HTTP access log](https://www.w3.org/Daemon/User/Config/Logging.html).

*Default value is /tmp/access.log.* (The location from where the log file will be consumed in real time).

### 3. ```LOG_ENCODING``` (log file character encoding)

The character encoding of the log file.

*Default value is utf-8.* (The encoding of the log file can be changed in case your system logs with a diferent [character encoding](https://en.wikipedia.org/wiki/Character_encoding#Common_character_encodings)).

## Usage

In order to use LogMoon, you can execute the following on the terminal:

```
logmoon
```

LogMoon should start running and displaying the information from your server log file.

## Development

To install locally and be able to contribute, clone this repo and save a copy of ```.env.example``` as ```.env```.

To execute the application:
```
npm start
```

To run the tests:
```
npm test
```

To generate the documentation:
```
npm doc
```

## Future improvements

- [ ] TODO
- [ ] TODO
