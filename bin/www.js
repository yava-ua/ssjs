const configLoader = require("../settings/configLoader");
const config = configLoader.getConfig().appServer;
var app = require('../app/appServer');
var debug = require('debug')('ServerSideJS:server');

const path = require('path');
const fs = require('fs');

const privateKey = fs.readFileSync(path.join(__dirname, '../app/certificate/local-mock.key'));
const certificate = fs.readFileSync(path.join(__dirname, '../app/certificate/local-mock.cer'));
const credentials = {key: privateKey, cert: certificate};


const httpsServer = require('https').createServer(credentials, app);
const httpServer = require('http').createServer(app);

app.set('port', config.port);

httpsServer.listen(config.secPort);
httpsServer.on('error', (err) => onError(err, config.secPort));
httpsServer.on('listening', () => onListening(httpsServer));

httpServer.listen(config.port);
httpServer.on('error', (err) => onError(err, config.port));
httpServer.on('listening', () => onListening(httpServer));


function onError(error, port) {
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

function onListening(server) {
    debug(`appServer running. Listening on port ${server.address().port}`);

}

exports.server = app;