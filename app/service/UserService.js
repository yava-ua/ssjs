const mongoose = require('mongoose');
const User = require('../storage/mongodb/model/user');

class UserService {
    static containsPrivilege(user, requiredPrivilege) {
        return user.roles
            .map(role => UserService.Roles[role])
            .reduce(function (a, b) {
                return a.concat(b);
            }, [])
            .includes(requiredPrivilege);
    }

    static registerUser(entity, cb) {
        User.register(new User({
            username: entity.username,
            firstName: entity.firstName,
            lastName: entity.lastName
        }), entity.password, cb);
    }

    static updateUserDetails(id, entity) {
        return User.findByIdAndUpdate(id, {
            $set: {
                firstName: entity.firstName,
                lastName: entity.lastName,
                roles: entity.roles
            }
        }, {upsert: true, "new": true}).exec();
    }

    static readAll() {
        return User.find({}).exec();
    }

    static deleteUser(id) {
        return User.findByIdAndRemove(id).exec();
    }
}

UserService.Privileges = {
    read: "read",
    write: "write",
    admin: "admin"
};

UserService.Roles = {
    content_manager: [UserService.Privileges.read, UserService.Privileges.write],
    viewer: [UserService.Privileges.read],
    admin: [UserService.Privileges.read, UserService.Privileges.write, UserService.Privileges.admin]
};

module.exports = UserService;