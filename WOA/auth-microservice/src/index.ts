require('dotenv').config();

import config from 'config';
import { App } from './App';

const PORT = config.get('api.port');
const VERSION = config.get('api.version');

const server = new App(Number(PORT), String(VERSION));

const app = server.listen();

module.exports = app;
