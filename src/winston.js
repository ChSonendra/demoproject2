const winston = require('winston');
const config = require('./configs/config.json');
const RootPath = require('app-root-path');
const { combine, timestamp, printf, colorize, align } = winston.format;
require('winston-daily-rotate-file');

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename:  `${RootPath}/logs/combined-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  });

const logger = winston.createLogger({
  level: config.logs.level || 'debug',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports:[
    new winston.transports.File({
        filename: `${RootPath}/logs/combined.log`,
      }),
      new winston.transports.File({
        filename: `${RootPath}/logs/error.log`,
        level: 'error',
      }),
      fileRotateTransport
  ]
});
module.exports = logger;