const debug = require('debug')('ServerSideJS:routes:user');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const LeaderMapper = require('../storage/inmemory/mapper/LeaderMapper');
const RouterManager = require('./RouteManager');

const CrudService = require('../service/CrudService');
const SimpleEntityProvider = require('../storage/inmemory/SimpleEntityProvider');

const leaderCrudService = new CrudService(new SimpleEntityProvider(new LeaderMapper()));
const leaderRouter = new RouterManager(leaderCrudService);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res, next) => leaderRouter.handleReadAll)
    .post('/', (req, res, next) => leaderRouter.handleCreateEntity)
    .delete('/', (req, res, next) => leaderRouter.handleDeleteAll)
    .get('/:leaderId', (req, res, next) => leaderRouter.handleReadEntity(req.params.userId, req, res, next).bind(leaderRouter))
    .put('/:leaderId', (req, res, next) => leaderRouter.handleUpdateEntity(req.params.userId, req, res, next).bind(leaderRouter))
    .delete('/:leaderId', (req, res, next) =>  leaderRouter.handleDeleteEntity(req.params.userId, req, res, next).bind(leaderRouter));

module.exports = router;
