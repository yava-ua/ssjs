const debug = require('debug')('ServerSideJS:main');
const appServer = require('./www');
const config = require("../settings/localhost.json");
const mongooseClient = require('../app/storage/mongodb/mongooseClient');

var server = appServer.start(config.appServer);
var db = mongooseClient.start(config.db);

debug('Application started');

exports.server = server;
exports.db = db;