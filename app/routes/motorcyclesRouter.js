const debug = require('debug')('ServerSideJS:routes:user');
const express = require('express');
const router = express.Router();

const Authenticator = require('./auth/authenticator');
const Response = require('./model/Response');
const RouterPromiseManager = require('./RoutePromiseManager');
const motorcycleService = require('../service/MotorcycleService');

const motorcycleRouter = new RouterPromiseManager(motorcycleService);

router.use(Authenticator.authenticationMiddleware);

router.get('/', (req, res, next) => Authenticator.authorizationMiddleware('read', req, res, next),
    motorcycleRouter.handleReadAll.bind(motorcycleRouter));

router.post('/', (req, res, next) => Authenticator.authorizationMiddleware('write', req, res, next),
    motorcycleRouter.handleCreateEntity.bind(motorcycleRouter));

router.delete('/', (req, res, next) => Authenticator.authorizationMiddleware('admin', req, res, next),
    motorcycleRouter.handleDeleteAll.bind(motorcycleRouter));

router.get('/:motorcycleId', (req, res, next) => Authenticator.authorizationMiddleware('read', req, res, next),
    (req, res, next) => motorcycleRouter.handleReadEntity(req.params.motorcycleId, req, res, next));

router.put('/:motorcycleId', (req, res, next) => Authenticator.authorizationMiddleware('write', req, res, next),
    (req, res, next) => motorcycleRouter.handleUpdateEntity(req.params.motorcycleId, req, res, next));

router.delete('/:motorcycleId', (req, res, next) => Authenticator.authorizationMiddleware('admin', req, res, next),
    (req, res, next) =>  motorcycleRouter.handleDeleteEntity(req.params.motorcycleId, req, res, next));

module.exports = router;
