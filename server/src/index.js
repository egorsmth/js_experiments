const express = require('express')
const app = express()
const morgan = require('morgan')

const router = require("./router");

const PORT = 8080;

app.use(morgan('short'))

// respond with "hello world" when a GET request is made to the homepage
app.use('/', router)



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})