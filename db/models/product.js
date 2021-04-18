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
		required: false,
		default: 0
	},
	available: { 
		type: Boolean, 
		required: false,
		default: false
	}
},
{
	timestamps: true
});

/* UPDATE TIME
productSchema.pre("save", function a(next) {
	this.dateUpdated = new Date();
	return next();
}); */

module.exports.ProductSchema = mongoose.model("ProductSchema", productSchema, "product");