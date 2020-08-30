const winston = require('winston');

const { format } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
   
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: combine(
                timestamp(),
                myFormat,
                winston.format.colorize({
                    all: true,
                }),
            ),
            level: "silly",
        }),
        new winston.transports.File({
            filename: "server.log",
            format: combine(
                timestamp(),
                myFormat,
                winston.format.json(),
            ),
        }),
    ]
});


 

module.exports = logger;