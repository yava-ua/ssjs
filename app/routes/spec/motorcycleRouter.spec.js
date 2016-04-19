const debug = require('debug')('ServerSideJS:motorcyclesRouter.spec.test');
const assert = require('assert');
const request = require('supertest');
const testApp = require('../../../bin/test');

describe('Motorcycles router test', function () {
    it.skip('should store motorcycle', function (done) {
        request(testApp.server)
            .post('/users/login')
            .send({username: 'test', password: 'password'})
            .post('/motorcycles')
            .send({
                type: 'scooter',
                name: 'Lambretta GP/DL',
                description: "The Lambretta GP/DL range was the final range of classic Lambrettas to be produced before Lambretta was sold to British Leyland Motor Corporation in 1971. The range was called the DL in most countries, but was called the GP (standing for Grand Prix) in Britain and some other countries. This was in order to associate the scooters with Formula One which was extremely popular and successful in the late 1960s"
            })
            .expect(200)
            .end(function (err, res) {
                var result = res.body;

                assert.ok(!result.error, 'Response error field must be empty');
                assert.ok(result.body, 'Response body field must be not empty');
                assert.equal(result.body.type, 'scooter', 'Type match');
                done();
            });
    });

});