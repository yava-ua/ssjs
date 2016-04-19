const debug = require('debug')('ServerSideJS:authenticator');
const config = require("../../../settings/configLoader").getConfig();
const Response = require('../model/Response');
const jwt = require('jsonwebtoken');

const UserService = require('../../service/UserService');

class Authenticator {
    static getToken(user) {
        return jwt.sign(
            {
                username: user.username,
                roles: user.roles
            }, config.appServer.secureKey, {
                expiresIn: 3600
            });
    }


    static authenticationMiddleware(req, res, next) {
        var token = req.body.token || req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json(new Response('You are not authenticated'));
        }

        jwt.verify(token, config.appServer.secureKey, function (err, decoded) {
            if (err) {
                return res.status(401).json(new Response('You are not authenticated!'));
            }
            req.current_user = decoded;
            next();
        });
    }

    static authorizationMiddleware(requiredPrivilege, req, res, next) {
        var current_user = req.current_user;
        if (!current_user) {
            return res.status(500).json(new Response('Authorization issue'));
        }

        if (!UserService.containsPrivilege(current_user, requiredPrivilege)) {
            return res.status(403).json(new Response('You are not authorised for this operation'));
        }

        next();
    }

}

module.exports = Authenticator;