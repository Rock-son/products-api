"use strict";

const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const currentDate = new Date();

// DEFINE MODEL
const productSchema = new Schema({
	name: {
		type: String, 
		required: true, 
		unique: true,
		index: true,
		trim: true
	},
	price: {
		type: Number, 
		required: true
	},
	available: { 
		type: Boolean, 
		required: true, 
		trim: true, 
		default: false 
	},
	dateCreated: { 
		type: Date, 
		default: currentDate 
	},
	dateUpdated: { 
		type: Date, 
		default: currentDate 
	}
});

// UPDATE TIME
productSchema.pre("save", function a(next) {
	this.updatedUTC = new Date();
	return next();
});

module.exports.ProductSchema = mongoose.model("ProductSchema", productSchema, "product");