const { getUser } = require('../enteties/user');
const { compare } = require('../services/security')

async function login(name, pass) {
  const user = await getUser()
    .findOne({ where: { name } });

  if (!user) {
    throw new Error("No such user: ", name);
  }

  if (!compare(pass, user.pass)) {
    throw new Error("Password not mutch");
  }

  return user;
}

async function registration(name, pass) {
  const user = await getUser()
    .create({ name, pass });
  return user;
}

module.exports = {
  registration,
  login
}