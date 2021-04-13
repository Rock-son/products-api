"use strict";

const { ProductSchema } = require("../models");

// GET ALL 
exports.gets = function getAllProducts() {
	return ProductSchema.find({});
};
// POST
exports.create = function postNewProduct({
	name = "test",
	price = 0,
	available = true
}) {
	const newProduct = new ProductSchema({
		name,
		price,
		available
	});
	return newProduct;
};
// GET ONE
exports.getOne = function getOneProduct(id) {
	return ProductSchema.find({ _id: id });
};

// DELETE ONE
exports.deleteOne = function deleteOneProduct(id) {
	return ProductSchema.deleteOne({ _id: id });
};

// PUT i.e. REPLACE
exports.replaceOne = function replaceOneProduct({
	id,
	name,
	price = 0,
	available = true,
	options = { new: true }
}) {

	return ProductSchema.findOneAndReplace({ _id: id }, { name, price, available }, options); // option { new: true } returns updated object
};