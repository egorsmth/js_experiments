const { getUser } = require('../enteties/user')
const { sign, compare } = require('../services/auth')

async function login(req, res) {
  const user = await getUser().findOne({ where: { name: req.body.username } })

  if (user && await compare(req.body.password, user.pass)) {
    const accessToken = await sign({ id: user.id });
    return res.send({
      accessToken,
    })
  }

  res.status(400).send({
    message: 'wrong login or password',
  });
}

module.exports = {
  login,
}