const express = require('express')
const router = express.Router()

const authJwt = require('./middlewares/authJwt')
const validators = require('./middlewares/validation');

const { login } = require('./controllers/login');
const { registartion } = require('./controllers/registration');
const { dashboard } = require('./controllers/dashboard');

router.post("/login", validators.validateLogin, login);
router.post("/registration", validators.validateRegistrationn, registartion);
router.get("/dashboard", authJwt, dashboard);

module.exports = router;