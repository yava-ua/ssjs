const assert = require('assert');
const Leader = require('../../model/Leader');
const LeaderMapper = require('../LeaderMapper');

var leaderMapper = new LeaderMapper();

describe('LeaderMapper test', function () {
    it('should map leader', function (done) {
        var leader = {pointsEarned: 10, userId: 0};
        var result = LeaderMapper.mapEntity(0, leader);
        assert.equal(result.pointsEarned, leader.pointsEarned, "Points earned match");
        assert.equal(result.userId, leader.userId, "User id match");
        assert.equal(result.id, 0);
        done();
    });

});
