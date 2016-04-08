const User = require('../model/User');
class UserMapper {
    constructor() {
        this.className = User.name;
    }

    static mapEntity(id, entity) {
        return new User(id, entity.firstName, entity.lastName);
    }
}

module.exports = UserMapper;