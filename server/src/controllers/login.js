const jwt = require("jsonwebtoken");
const config = require("../consfig");

function login(req, res) {
  let userValid = true;
  if (userValid) {
    const token = jwt.sign({ id: "some-user-id" }, config.jwt_secret, {
      expiresIn: 86400 // 24 hours
    });
    res.send({
      accessToken: token,
    })

  }
}

module.exports = {
  login,
}