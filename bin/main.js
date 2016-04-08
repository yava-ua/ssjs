const debug = require('debug')('ServerSideJS:main');
const appServer = require('./www');
const mongooseClient = require('../app/storage/mongodb/mongooseClient');

debug('Application started');