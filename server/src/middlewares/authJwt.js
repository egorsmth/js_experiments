const { getLogger } = require('../logger');
const { verify } = require('../services/auth')

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  try {
    const decode = await verify(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    getLogger().warn(err);
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
};

module.exports = verifyToken;