const debug = require('debug')('ServerSideJS:routes:user');
const express = require('express');
const router = express.Router();

const LeaderMapper = require('../service/mapper/LeaderMapper');
const RouterManager = require('./RouteManager');

const CrudService = require('../service/CrudService');
const SimpleEntityProvider = require('../service/SimpleEntityProvider');

const leaderCrudService = new CrudService(new SimpleEntityProvider(new LeaderMapper()));
const leaderRouter = new RouterManager(leaderCrudService);

router.get('/', leaderRouter.handleReadAll.bind(leaderRouter))
    .post('/', leaderRouter.handleCreateEntity.bind(leaderRouter))
    .delete('/', leaderRouter.handleDeleteAll.bind(leaderRouter))
    .get('/:leaderId', (req, res, next) => leaderRouter.handleReadEntity(req.params.userId, req, res, next).bind(leaderRouter))
    .put('/:leaderId', (req, res, next) => leaderRouter.handleUpdateEntity(req.params.userId, req, res, next).bind(leaderRouter))
    .delete('/:leaderId', (req, res, next) =>  leaderRouter.handleDeleteEntity(req.params.userId, req, res, next).bind(leaderRouter));

module.exports = router;
