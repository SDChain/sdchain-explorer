'use strict';
const config = require('./global/globalConfig');
const Server = require('./server');

const server = new Server();
server.start();
