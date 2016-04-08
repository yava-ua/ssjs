const assert = require('assert');

const storage = require('../storage');
const User = require('../model/User');
const UserMapper = require('../mapper/UserMapper');
const SimpleEntityProvider = require('../SimpleEntityProvider');

var simpleEntityProvider = new SimpleEntityProvider(new UserMapper());

describe('SimpleEntityProvider test', function () {

    it('should store user', function (done) {
        "use strict";
        let user = new User(0, "Yaroslav", "Boychuk");
        let result = simpleEntityProvider.createEntity(user);
        assert(result, "Operation should succeed");
        assert.deepEqual(storage.getStorage(User.name)[0], user, 'Storage should contain user');
        done();
    });

});