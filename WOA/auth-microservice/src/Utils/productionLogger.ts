import { createLogger, transports, format } from 'winston';
import config from 'config';
import 'winston-mongodb';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}  ${message}`;
});

const productionLogger: any = () => {
  return createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new transports.File({ filename: 'combined.log' }),
      new transports.MongoDB({
        db: 'mongodb+srv://admin:admin@cluster0.43cfpeu.mongodb.net/WOAauth',
        options: { useUnifiedTopology: true },
      }),
    ],
  });
};

const logger = productionLogger();

export default logger;
