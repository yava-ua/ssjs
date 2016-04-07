const Leader = require('../../domain/Leader');
class LeaderMapper {
    constructor() {
        this.className = Leader.name;
    }

    static mapEntity(id, entity) {
        return new Leader(id, entity.pointsEarned, entity.userId);
    }
}

module.exports = LeaderMapper;