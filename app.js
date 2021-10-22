require('dotenv').config();

const Server = require('./models/server');

const server = new Server();
// Launch server on 3000 PORT
server.listen();