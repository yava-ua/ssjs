const Response = require('./model/Response');
const debug = require('debug')('ServerSideJS:routes:RouteManager');

function handlePromise(promise, req, res, next) {
    promise
        .then(result => {
            res.status(200).json(new Response(undefined, result));
        }, error => {
            res.status(200).json(new Response(error, undefined));
        })
        .catch(exception => {
            res.status(200).json(new Response(exception, undefined));
        });
}

class RoutePromiseManager {
    constructor(service) {
        this.service = service;
    }

    handleReadAll(req, res, next) {
        handlePromise(this.service.readAll(), req, res, next);
    }

    handleDeleteAll(req, res, next) {
        handlePromise(this.service.deleteAll(), req, res, next);
    }

    handleCreateEntity(req, res, next) {
        let entity = req.body;
        handlePromise(this.service.createEntity(entity), req, res, next);
    }

    handleReadEntity(entityId, req, res, next) {
        handlePromise(this.service.readEntity(entityId), req, res, next);
    }

    handleUpdateEntity(entityId, req, res, next) {
        handlePromise(this.service.updateEntity(entityId, req.body), req, res, next);
    }

    handleDeleteEntity(entityId, req, res, next) {
        handlePromise(this.service.deleteEntity(entityId), req, res, next);
    }
}

module.exports = RoutePromiseManager;
