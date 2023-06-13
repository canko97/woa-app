require('dotenv').config();

import config from 'config';
import { App } from './App';

const PORT = 5001; //config.get('api.port');

const server = new App(Number(PORT));

const app = server.listen();

module.exports = app;
