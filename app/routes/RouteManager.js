const debug = require('debug')('ServerSideJS:routes:RouteManager');
class RouteManager {
    constructor(service) {
        this.service = service;
    }

    handleReadAll(req, res, next) {
        let result = this.service.readAll();
        res.status(200).json(result);
    }

    handleDeleteAll(req, res, next) {
        let result = this.service.deleteAll();
        res.status(200).json(result);
    }

    handleCreateEntity(req, res, next) {
        let entity = req.body;
        let result = this.service.createEntity(entity);
        res.status(200).json(result);
    }

    handleReadEntity(entityId, req, res, next) {
        let result = this.service.readEntity(entityId);
        res.status(200).json(result);
    }

    handleUpdateEntity(entityId, req, res, next) {
        let result = this.service.updateEntity(entityId, req.body);
        res.status(200).json(result);
    }

    handleDeleteEntity(entityId, req, res, next) {
        let result = this.service.deleteEntity(entityId);
        res.status(200).json(result);
    }
}

module.exports = RouteManager;
