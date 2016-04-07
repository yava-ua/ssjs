const User = require('../../domain/User');
const RouteManager = require('../RouteManager');
const CrudService = require('../../service/CrudService');
const SimpleEntityProvider = require('../../service/SimpleEntityProvider');

const userCrudService = new CrudService(new SimpleEntityProvider(User.name));
const userRouter = new RouteManager(userCrudService);

describe('RouteManager test', function () {

    it('should handle create', function (done) {
        done();
    });

});