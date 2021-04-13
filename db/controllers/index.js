"use strict";

const { ProductSchema } = require("../models");

// GET ALL 
exports.gets = async function getAllProducts() {
	return await ProductSchema.find({});
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
exports.getOne = async function getOneProduct(id) {
	return await ProductSchema.find({ _id: id });
};

// DELETE ONE
exports.deleteOne = async function deleteOneProduct(id) {
	return await ProductSchema.deleteOne({ _id: id });
};

// PUT i.e. REPLACE
exports.replaceOne = async function replaceOneProduct({
	id,
	name,
	price,
	available
}) {	
	return await ProductSchema.findOneAndReplace({ _id: id }, { name, price, available });
};