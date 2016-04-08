const Entity = require('./Entity');
class Leader extends Entity {
    constructor(id, pointsEarned, userId) {
        super(id);
        this.pointsEarned = pointsEarned;
        this.userId = userId;
    }
    getLeaderStatus() {
        return `Leader with id ${this.userId} earned ${this.pointsEarned} points`;
    }
}
module.exports = Leader;