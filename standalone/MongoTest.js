const EventEmitter = require('event-emitter');
const debug = require('debug')('ServerSideJS:MongoClient');
const MongoClient = require('mongodb').MongoClient;
const config = require("../settings/localhost.json").db;

var emitter = new EventEmitter();
emitter.on('shut-down', function () {
    debug('Shutting down');
    process.exit();
});

var url = `mongodb://${config.host}:${config.port}/${config.instance}`;

MongoClient.connect(url, (err, db) => {
    debug(`Connected to db`);

    let collection = db.collection("users");
    collection.insertOne({firstName: "Maryna", lastName: "Abulova"}, (err, result) => {
        debug(result.ops);
    });

});

setTimeout(function () {
    emitter.emit('shut-down');
}, 500);
