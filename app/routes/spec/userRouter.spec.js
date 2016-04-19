const debug = require('debug')('ServerSideJS:usersRouter.spec.test');
const assert = require('assert');
const request = require('supertest');
const testApp = require('../../../bin/test');

describe('Users router test', function () {
    it('should get all users', function (done) {
        request(testApp.server)
            .get('/users')
            //.send({username: 'test-2', password: 'password'})
            .expect(200)
            .end(function(err, res){
                var result = res.body;

                assert.ok(!result.error, 'Response error field must be empty');
                assert.ok(result.body, 'Response body field must be not empty');
                assert.equal(result.body[0].firstName, 'Yaroslav', 'First name match');
                done();
            });
    });

});