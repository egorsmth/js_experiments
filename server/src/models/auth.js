const { getUser } = require('../enteties/user');

async function login({
  name,
  pass,
}) {
  return
}

async function registration({
  name,
  pass,
}) {
  const user = await getUser().create({
    name,
    pass,
  });
  return user;
}

module.exports = {
  registration,
  login
}