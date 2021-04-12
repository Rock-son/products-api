"use strict";

module.exports = function health(req, res) {
	// do app logic here to determine if app is truly healthy
	// you should return 200 if healthy, and anything else will fail
	// if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
	res.status(200).send('I am healthy\n');
}