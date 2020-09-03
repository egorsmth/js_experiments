const { getLogger } = require('../logger');
const { verify } = require('../services/security')
const { getUser } = require('../enteties/user');

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  try {
    const decode = await verify(token);
    const user = await getUser().findByPk(decode.id);
    if (!user) {
      throw new Error("No such user, JWT mallformed");
    }
    req.user = user;
    next();
  } catch (err) {
    getLogger().warn(err.stack);
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
};

module.exports = verifyToken;