"use strict";

const helmet = require("helmet");

module.exports = function helmetFunc(app) {
	app.use(helmet.hidePoweredBy({
		setTo: 'PHP 7.2.0'
	}));

	app.use(helmet.contentSecurityPolicy({
		directives: {
			"defaultSrc": 	[ "'self'" ],
			"objectSrc": 	[ "'none'"],
			"sandbox":		[ "allow-modals", "allow-forms", "allow-scripts", "allow-same-origin", "allow-popups" ]
		},
		upgradeInsecureRequests: true,
		reportOnly: true,
		reportUri: '/report-violation',
		safari5: false
	}));
};