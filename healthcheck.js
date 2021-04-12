/* eslint-disable no-console */
// must be the same name as HEALTHCHECK file in Dockerfile

const http = require("http");
const options = {
	timeout: 2000,
	hostname: "api_gateway",
	port: 3000,
	agent: false,
	path: '/healthy'
};

const request = http.request(options, (res) => {
	console.info(`STATUS: ${res.statusCode}`);
	process.exitCode = (res.statusCode === 200) ? 0 : 1;
	process.exit();
});

request.on('error', (err) => {
	console.error('ERROR', err);
	process.exit(1);
});

request.end();