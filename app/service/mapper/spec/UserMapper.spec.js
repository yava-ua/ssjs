const assert = require('assert');
const User = require('../../../domain/User');
const UserMapper = require('../UserMapper');

var userMapper = new UserMapper();

describe('UserMapper test', function () {
    it('should map user', function (done) {
        var user = {firstName: "Yaroslav", lastName: "Boychuk"};
        var result = UserMapper.mapEntity(0, user);
        assert.equal(result.firstName, user.firstName);
        assert.equal(result.lastName, user.lastName);
        assert.equal(result.id, 0);
        done();
    });

});
