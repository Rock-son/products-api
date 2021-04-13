const app = require("../server.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

const db = require("../db/controllers");
const dbConnectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CONTAINER_NAME}:27017/${process.env.MONGO_DB}`;

beforeEach((done) => {	
	mongoose.connect(dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}, () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => { mongoose.connection.close(() => done())});
});


test("GET /api/products", async () => {
	const product = await db.create({ name: "Product 1", price: 990, availability: true });
  
	await supertest(app).get("/api/products")
	  .expect(200)
	  .then((response) => {
		// Check type and length
		expect(Array.isArray(response.body)).toBeTruthy();
		expect(response.body.length).toEqual(1);
  
		// Check data
		expect(response.body[0].name).toBe("Product 1");
		expect(response.body[0].price).toBe(990);
		expect(response.body[0].availability).toBe(true);
	  });
  });