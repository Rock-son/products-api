"use strict";

module.exports = function reportViolation(req, res) {
	if (req.body) {
		console.log('csp violation: ', req.body)
	} else {
		console.log('csp violation: no data received!')
	}
	res.status(204).end();
}