const express = require('express')
const router = express.Router()

const { login } = require('./controllers/login');
const { registartion } = require('./controllers/registration');
const { dashboard } = require('./controllers/dashboard');

module.exports = router;

router.post("/login", login);
router.post("/registration", registartion)
router.get("/dashboard", dashboard)