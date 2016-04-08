const Entity = require('./Entity');
class User extends Entity {
    constructor(id, firstName = "John", lastName = "Doe") {
        super(id);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
module.exports = User;