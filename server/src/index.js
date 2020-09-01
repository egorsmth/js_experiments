const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require("body-parser")
const cors = require("cors");

const { init: initLogger } = require('./logger');
const { init: initDb } = require('./db');

const router = require("./router");

const PORT = 8080;

process.on('unhandledRejection', (reason) => {
    console.log("Unhandled rejection catched in global", reason);
});

process.on('uncaughtException', () => {
    console.log("Unhandled exception catched in global")
});

async function init() {
    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(morgan('short'))
    
    // respond with "hello world" when a GET request is made to the homepage
    app.use('/', router)
    
    initLogger();
    await initDb();
    
    
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
}

init();