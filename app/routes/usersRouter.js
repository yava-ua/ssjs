const debug = require('debug')('ServerSideJS:routes:user');
const express = require('express');
const router = express.Router();

const UserMapper = require('../service/mapper/UserMapper');
const RouterManager = require('./RouteManager');

const CrudService = require('../service/CrudService');
const SimpleEntityProvider = require('../service/SimpleEntityProvider');

const userCrudService = new CrudService(new SimpleEntityProvider(new UserMapper()));
const userRouter = new RouterManager(userCrudService);

router.get('/', userRouter.handleReadAll.bind(userRouter))
    .post('/', userRouter.handleCreateEntity.bind(userRouter))
    .delete('/', userRouter.handleDeleteAll.bind(userRouter))
    .get('/:userId', (req, res, next) => userRouter.handleReadEntity(req.params.userId, req, res, next).bind(userRouter))
    .put('/:userId', (req, res, next) => userRouter.handleUpdateEntity(req.params.userId, req, res, next).bind(userRouter))
    .delete('/:userId', (req, res, next) =>  userRouter.handleDeleteEntity(req.params.userId, req, res, next).bind(userRouter));

module.exports = router;
