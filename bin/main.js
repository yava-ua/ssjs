const debug = require('debug')('ServerSideJS:main');
const configLoader = require("../settings/configLoader");
configLoader.loadConfig(require("../settings/localhost.json"));

const appServer = require('./www');
const mongooseClient = require('../app/storage/mongodb/mongooseClient');

debug('Application started');

exports.server = appServer;
exports.db = mongooseClient;
