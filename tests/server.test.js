const app = require("../server.js");
const supertest = require("supertest");

describe("Test the root path of product API", () => {
	test("It should response the GET method", done => {
		supertest(app)
			.get("/api/products")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Test the health path", () => {
	test("It should response the GET method", done => {
		supertest(app)
			.get("/healthy")
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Test the violation report path", () => {
	test("It should response the POST method", done => {
		supertest(app)
			.post("/report-violation")
			.send({ "csp-report": {
						"document-uri": "http://example.com/signup.html",
						"referrer": "",
						"blocked-uri": "http://example.com/css/style.css",
						"violated-directive": "style-src cdn.example.com",
						"original-policy": "default-src 'none'; style-src cdn.example.com; report-uri /_/report-violation",
						"disposition": "report"
					}
				})
			.then(response => {
				expect(response.statusCode).toBe(204);
				done();
			});
	});
});