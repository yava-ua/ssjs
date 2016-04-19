const Response = require('../model/Response');

function handlePromiseResponse(promise, req, res, next) {
    promise
        .then(result => {
            res.status(200).json(new Response(undefined, result));
        }, error => {
            res.status(200).json(new Response(error, undefined));
        })
        .catch(exception => {
            res.status(200).json(new Response(exception, undefined));
        });
}

exports.handlePromiseResponse = handlePromiseResponse;