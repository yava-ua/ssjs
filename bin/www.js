const configLoader = require("../settings/configLoader");
const config = configLoader.getConfig().appServer;
var app = require('../app/appServer');
var debug = require('debug')('ServerSideJS:server');
var http = require('http');
var server = http.createServer(app);

var port = config.port;
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    debug(`appServer running. Listening on port ${server.address().port}`);

}

exports.server = server;