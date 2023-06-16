import logger from 'pino';
import dayjs from 'dayjs';
import config from 'config';

const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level: 'debug',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
