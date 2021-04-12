/* eslint-disable no-console */
"use strict";

/**
 * Module dependencies.
 */
const http = require("http");
const cluster = require("cluster");
const numCPUs = require('os').cpus().length;

const app = require("../server");
const utils = require("./utils");

const mongoose = require("mongoose");
const mongoConnection = mongoose.connection;
/**
 * Get port from environment and store in Express.
 */
const port = utils.normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * ************************Create HTTP server. **************************************
 */
const server = http.createServer(app);

if (cluster.isMaster) {
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
	  cluster.fork();
	}
  } else {
	server.listen(port);
  }



// EVENT HANDLING

server.on('error', utils.onError.bind(null, {
	port
}));
server.on('listening', utils.onListening.bind(null, {
	server
}));

/**
 * For catching process.on events
 */

// name the process so it can be stopped it with "npm run stop"
process.title = "product_api";


process.on('SIGTERM', (id) => {
    console.log(`Worker ${ id } exiting...`);
    // cleanup happens here
	mongoConnection.close();
    process.exit();
});
// when app is closing
process.on('exit', (exitCode) => console.error("Application exited with exit code: ", exitCode));



// catches ctrl+c event
process.on('SIGINT', utils.exitHandler.bind(null, mongoConnection, {
	exit: true
}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', utils.exitHandler.bind(null, mongoConnection, {
	exit: true
}));
process.on('SIGUSR2', utils.exitHandler.bind(null, mongoConnection, {
	exit: true
}));

// catches uncaught exceptions
process.on('uncaughtException', err => console.error("Api is loging uncaughtException", err));


process.on('unhandledRejection', err => console.error("Api is loging unhandledRejection", err));


module.exports = server;