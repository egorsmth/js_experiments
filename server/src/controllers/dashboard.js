const {getLogger} = require('../logger')

module.exports = {
    dashboard,
}

function dashboard(req, res) {
    for (let level of Object.keys(getLogger().levels)) {
        getLogger()[level](`This is ${level}`);
    }

    res.send("dashboard 1");
}