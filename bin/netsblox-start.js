'use strict';
var path = require('path');
require('dotenv').load({
    path: path.join(__dirname, '..', '.env'),
    silent: true
});

var express = require('express'),
    app = express();

const PORT = process.env.PORT || 8080;
const VANTAGE_PORT = process.env.VANTAGE_PORT || 1234;
const ENV = process.env.ENV;
const isDevMode = ENV !== 'production';

app.use(express.static(__dirname + '/client/'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});


function isVantageEnabled() {
    const VANTAGE_ENABLED = process.env.VANTAGE_ENABLED === 'true';
    if (ENV === 'production') return false;
    if (VANTAGE_ENABLED !== undefined) return VANTAGE_ENABLED;
    if (VANTAGE_PORT) return true;
    return isDevMode;
}

// Set the group manager
var opts = {
    port: PORT,
    vantagePort: VANTAGE_PORT,
    vantage: isVantageEnabled(),
};

var Server = require('../src/server/server'),
    server = new Server(opts);

server.start();
