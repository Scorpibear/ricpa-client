# RICPA client
[![Build Status](https://travis-ci.org/Scorpibear/ricpa-client.svg?branch=master)](https://travis-ci.org/Scorpibear/ricpa-client)
[![Coverage Status](https://codecov.io/gh/Scorpibear/ricpa-client/branch/master/graph/badge.svg)](https://codecov.io/gh/Scorpibear/ricpa-client)
[![npm version](https://badge.fury.io/js/ricpa-client.svg)](https://www.npmjs.com/package/ricpa-client)

RICPA client, client for Remote Chess Engine, implemented following RICPA protocol

## Install
```
npm install ricpa-client --save
```

## Examples of usage
```javascript
const Client = require('ricpa-client');
const client = new Client('http://hostname:port/api');
const itemList = client.getQueue();
client.postFen({fen, depth});
const {fen, depth, bestMove, score, placeInQueue, estimatedTime} = client.getFen({fen, depth});
```
