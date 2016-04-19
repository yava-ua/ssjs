
function stringifyError(error) {
    return JSON.stringify(error, ["message", "name", "status"]);
}

exports.stringifyError = stringifyError;

