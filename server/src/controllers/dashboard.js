const logger = require('../logger')

module.exports = {
    dashboard,
}

function dashboard(req, res) {
    for (let level of Object.keys(logger.levels)) {
        logger[level](`This is ${level}`);
    }

    res.send("dashboard 1");
}