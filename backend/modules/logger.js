const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const {formatTimestamp, formatTimespan} = require('../../shared/helpers/date-helpers');

const startDate = new Date();

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => formatTimestamp(new Date()),
    }),
    winston.format.printf(({timestamp, level, message}) => {
      return `${timestamp} +${formatTimespan(new Date() - startDate)} ${level.toUpperCase()} ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      dirname: `${__dirname}/../../tmp`,
      filename: `%DATE%.${process.env.LOGKEY || 'admin'}.log`,
      datePattern: `YYYY-MM-DD`,
      maxFiles: 7,
      maxSize: `1g`,
    }),
  ],
});

module.exports = logger;
