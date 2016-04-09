const debug = require('debug')('ServerSideJS:routes:user');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const authenticationManager = require('./authenticationManager');
const RouterPromiseManager = require('./RoutePromiseManager');
const CrudService = require('../service/CrudService');
const MongooseProvider = require('../storage/mongodb/MongooseProvider');
const UserMapper = require('../storage/mongodb/mapper/UserMapper');

const userCrudService = new CrudService(new MongooseProvider(new UserMapper()));
const userRouter = new RouterPromiseManager(userCrudService);

router.use(authenticationManager.handleAuthentication);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.get('/', userRouter.handleReadAll.bind(userRouter))
    .post('/', userRouter.handleCreateEntity.bind(userRouter))
    .delete('/', userRouter.handleDeleteAll.bind(userRouter))
    .get('/:userId', (req, res, next) => userRouter.handleReadEntity(req.params.userId, req, res, next))
    .put('/:userId', (req, res, next) => userRouter.handleUpdateEntity(req.params.userId, req, res, next))
    .delete('/:userId', (req, res, next) =>  userRouter.handleDeleteEntity(req.params.userId, req, res, next));

router.use(authenticationManager.handleAuthenticationError);

module.exports = router;
