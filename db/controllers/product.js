"use strict";

const { ProductSchema } = require("../models");

// GET ALL 
exports.gets = function getAllProducts() {
	return ProductSchema.find({});
};
// POST
exports.createModel = function postNewProduct({
	name,
	price,
	available
}) {
	const newProduct = new ProductSchema({
		name,
		price,
		available
	});
	return newProduct;
};
// GET BY ID or NAME
exports.getOne = function getOneProductById(id, name) {
	const query = id == null ? { name } : { _id: id }; // query by id or name (since name is unique)
	return ProductSchema.find(query);
};

// DELETE ONE
exports.deleteOne = function deleteOneProduct(id) {
	return ProductSchema.deleteOne({ _id: id });
};

// PUT i.e. REPLACE
exports.createOrUpdate = function createOrUpdateProduct({
	id,
	name,
	price,
	available
}) {
	const query = id == null ? { name } : {_id: id }; // query by id or name
	return ProductSchema.findOneAndUpdate(query, 
		{ 
			name,
			price,
			available
		},
		// new: , upsert - creates new if it doesn't exist
		{ 
			new: true, 					// true - returns updated object
			upsert: true, 				// creates the object if it doesn't exist
			setDefaultsOnInsert: true	// if this and upsert are true, mongoose will apply the defaults specified in the model's schema
		});
};