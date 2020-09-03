const { login : loginModel } = require('../models/auth');
const { sign } = require('../services/security')
const { getLogger } = require('../logger');

async function login(req, res) {
  try {
    const user = await loginModel(req.body.username, req.body.password);
    const accessToken = await sign({ id: user.id });
    return res
      .send({
        accessToken,
      });

  } catch (err) {
    getLogger().warn(err.stack);
    return res.status(400)
      .send({
        message: 'wrong login or password',
      });
  }
}

module.exports = {
  login,
}