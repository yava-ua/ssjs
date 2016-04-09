const debug = require('debug')('ServerSideJS:userRouter.spec.test');
const assert = require('assert');
const request = require('supertest');
const testApp = require('../../../bin/test');

describe('Users router test', function () {
    it('should store user', function (done) {
        request(testApp.server)
            .post('/users')
            .send({firstName: 'Yaroslav', lastName: 'Boychuk'})
            .expect(200)
            .end(function(err, res){
                var result = res.body;

                assert.ok(!result.error, 'Response error field must be empty');
                assert.ok(result.body, 'Response body field must be not empty');
                assert.equal(result.body.firstName, 'Yaroslav', 'First name match');
                done();
            });
    });

});