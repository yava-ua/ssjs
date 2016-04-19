const debug = require('debug')('ServerSideJS:user');
const express = require('express');
const passport = require('passport');

const routerUtils = require('./utils/routerUtils');
const Response = require('./model/Response');

const router = express.Router();

const Authenticator = require('./auth/authenticator');
const RouterPromiseManager = require('./RoutePromiseManager');
const userService = require('../service/UserService');

router.get('/', (req, res, next) => routerUtils.handlePromiseResponse(userService.readAll(), req, res, next));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            debug('Failed to authenticate');
            return next(err);
        }

        if (!user) {
            debug('Failed to authenticate. User not provided');
            return res.status(401).json(new Response(info));
        }

        req.logIn(user, (loginError) => {
            if (loginError) {
                debug(`Failed to authenticate. Login failed for ${user.username}`);
                return res.status(401).json(new Response(JSON.stringify(loginError)));
            }

            var token = Authenticator.getToken(user);
            debug(`${user} authenticated. Generated token: ${token}`);
            return res.status(200).json(new Response(undefined, token));
        })
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    return res.status(200).json(new Response(undefined, "Bye"));
});

router.post('/register', (req, res, next) => {
    "use strict";
    var userDetails = req.body;
    userService.registerUser(userDetails, (err, result) => {
        if (result) {
            passport.authenticate('local');
            return res.status(200).json(new Response(undefined, result));
        }
        return res.status(200).json(new Response(err, undefined));
    });
});


router.put('/:userId', /*(res, req, next) => Authenticator.authorizationMiddleware('admin', req, res, next),*/
    (req, res, next) =>  routerUtils.handlePromiseResponse(userService.updateUserDetails(req.params.userId, req.body), req, res, next));

router.delete('/:userId', (req, res, next) =>  routerUtils.handlePromiseResponse(userService.deleteUser(req.params.userId), req, res, next));


module.exports = router;
