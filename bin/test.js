const debug = require('debug')('ServerSideJS:main');
const configLoader = require("../settings/configLoader");
configLoader.loadConfig(require("../settings/localhost-test.json"));

const appServer = require('./www').server;
const mongooseClient = require('../app/storage/mongodb/mongooseClient').db;

debug('Test application started');

exports.server = appServer;
exports.db = mongooseClient;