const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require("body-parser")
const cors = require("cors");

const router = require("./router");

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('short'))

// respond with "hello world" when a GET request is made to the homepage
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})