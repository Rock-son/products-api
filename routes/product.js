"use strict";

const express = require("express");
const router = express.Router();

const { product } = require("../db/controllers");

// GET ALL
router.get("/products", async (req, res) => {
	const data = await product.gets();
	res.send(data);
});

// POST NEW
router.post("/product", async (req, res) => {
	const { name, price, available } = req.body;
	const newProduct = await product.create({ name, price, available });
	await newProduct.save(function(err, doc) {
		if (err) {
			if (err.code && err.code === 11000) {
				return res.status(400).send({ "error": "duplicate product" });
			} else {
				return res.status(400).send(err);
			}
		}
		return res.status(200).send(doc);
	});
});

// GET ONE
router.get("/product/:id", async (req, res) => {
	const { id } = req.params;
	const data = await product.getOne(id);
	res.send(data);
});

// DELETE ONE
router.delete("/product/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const data = await product.deleteOne(id);
		res.send(data);
	} catch (error) {
		return res.status(400).send(err);
	}	
});

// PUT i.e. REPLACE
router.put("/product", async (req, res) => {
	const { id, name, price, available } = req.body;
	try {
		const newProduct = await product.replaceOne({ id, name, price, available });
		return res.status(200).send(newProduct);
	} catch (err) {
		if (err) {
			if (err.code && err.code === 11000) {
				return res.status(400).send({ "error": "duplicate product" });
			} else {
				return res.status(400).send(err);
			}
		}
	}
});

module.exports = router;