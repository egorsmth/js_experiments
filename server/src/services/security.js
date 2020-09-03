const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const config = require('../config');

var salt = bcrypt.genSaltSync(17);

async function verify(token) {
  return jwt.verify(token, config.jwt_secret);
}

async function sign(data) {
  return jwt.sign(data, config.jwt_secret, {
    expiresIn: 86400 // 24 hours
  });
}

async function encode(data) {
  return bcrypt.hash(data, salt);
}

async function compare(data, hash) {
  return bcrypt.compare(data, hash);
}

module.exports = {
  verify,
  sign,
  encode,
  compare,
}