var config = {};
function loadConfig(configFile) {
    config = configFile;
    return config;
}

function getConfig() {
    return config;
}

module.exports = {
    loadConfig: loadConfig,
    getConfig: getConfig
};