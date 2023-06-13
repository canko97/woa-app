require('dotenv').config();

import config from 'config';
import { App } from './App';

const PORT = config.get('api.port');
const version = config.get('api.version');

const server = new App(Number(PORT), String(version));

const app = server.listen();

module.exports = app;
