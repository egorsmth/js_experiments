const auth = require('../models/auth');
const { encode, sign } = require('../services/security')

module.exports = {
    registartion,
}

async function registartion(req, res) {
    const { username, password } = req.body;
    const user = await auth.registration(username, await encode(password));

    const accessToken = await sign({ id: user.id });
    res.json({
        accessToken,
    });
}