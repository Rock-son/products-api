const app = require("../server.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

const { product } = require("../db/controllers");
const dbConnectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CONTAINER_NAME}:27017/${process.env.MONGO_DB}`;

beforeEach((done) => {	
	mongoose.connect(dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => done());
});

afterEach((done) => {
  mongoose.connection.dropCollection("product", () => { mongoose.connection.close(() => done())});
});

// GET ALL PRODUCTS
test("GET /api/products", async () => {
	const newProduct = await product.createModel({ name: "Product 1", price: 190, available: true }).save();  
	await supertest(app).get("/api/products")
	  .expect(200)
	  .then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);
			// Check data
			expect(response.body[0].name).toBe(newProduct.name);
			expect(response.body[0].price).toBe(newProduct.price);
			expect(response.body[0].available).toBe(newProduct.available);
	  });
});

// GET ONE PRODUCT
test("GET /api/product/:id", async () => {
	const newProduct = await product.createModel({ name: "Product 2", price: 290, available: true }).save();  
	await supertest(app).get(`/api/product/${newProduct._id}`)
	  .expect(200)
	  .then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);
			// Check data
			expect(response.body[0].name).toBe(newProduct.name);
			expect(response.body[0].price).toBe(newProduct.price);
			expect(response.body[0].available).toBe(newProduct.available);
	  });
});
  
// POST NEW PRODUCT
test("POST /api/product", async () => {
	const newProduct = { name: "Product 3", price: 990, available: true };
	await supertest(app).post(`/api/product`)
		.send({ name: newProduct.name, price: newProduct.price, available: newProduct.available })
	  	.expect(201)
	  	.then((response) => {
			// Check status and type
			expect(response.statusCode).toBe(201);
			expect(typeof response.body).toEqual("object");
			// Check data
			expect(response.body.name).toBe(newProduct.name);
			expect(response.body.price).toBe(newProduct.price);
			expect(response.body.available).toBe(newProduct.available);
	  });
});

// POST - CREATE NEW PRODUCT WITH DEFAULTS
test("POST /api/product with defaults", async () => {
	const newProduct = { name: "Product 3"};
	await supertest(app).post(`/api/product`)
		.send({ name: newProduct.name })
	  	.expect(201)
	  	.then((response) => {
			// Check status and type
			expect(response.statusCode).toBe(201);
			expect(typeof response.body).toEqual("object");
			// Check data
			expect(response.body.name).toBe(newProduct.name);
			expect(response.body.price).toBe(0);
			expect(response.body.available).toBe(false);
	  });
});

// DELETE PRODUCT
test("DELETE /api/product/:id", async () => {
	const newProduct = await product.createModel({ name: "Product 4", price: 490, available: true }).save();  
	await supertest(app).delete(`/api/product/${newProduct._id}`)
		.expect(200)
		.then((response) => {
			// Check status and type
			expect(response.statusCode).toBe(200);
			expect(typeof response.body).toEqual("object");
			// Check data
			expect(response.body.ok).toBe(1);
			expect(response.body.deletedCount).toBe(1);
	  });
});

// PUT - REPLACE EXISTING PRODUCT
test("PUT /api/product - replace existing", async () => {
	const newProduct = await product.createModel({ name: "Product 5", price: 590, available: true }).save();
	const replacedProduct = { name: "Product 10", price: 990, available: false };
	await supertest(app).put(`/api/product`)
		.send({ id: newProduct._id, name: replacedProduct.name, price: replacedProduct.price, available: replacedProduct.available })
	  	.expect(200)
	  	.then((response) => {
			// Check status and type
			expect(response.statusCode).toBe(200);
			expect(typeof response.body).toEqual("object");
			// Check data
			expect(response.body.name).toBe(replacedProduct.name);
			expect(response.body.price).toBe(replacedProduct.price);
			expect(response.body.available).toBe(replacedProduct.available);
	  });
});

// PUT - CREATE NEW PRODUCT
test("PUT /api/product - create new one", async () => {
	const newProduct = { name: "Product 10", price: 990, available: false };
	await supertest(app).put(`/api/product`)
		.send({ name: newProduct.name, price: newProduct.price, available: newProduct.available })
	  	.expect(200)
	  	.then((response) => {
			// Check status and type
			expect(response.statusCode).toBe(200);
			expect(typeof response.body).toEqual("object");
			// Check data
			expect(response.body.name).toBe(newProduct.name);
			expect(response.body.price).toBe(newProduct.price);
			expect(response.body.available).toBe(newProduct.available);
	  });
});
