"use strict";

const express = require("express");
const router = express.Router();

const db = require("../db/controllers");

// GET ALL
router.get("/products", async (req, res) => {
	const data = await db.gets();
	res.send(data);
});

// POST NEW
router.post("/product", async (req, res) => {
	const { name, price, available } = req.body;
	const newProduct = db.create({ name, price, available });
	await newProduct.save(function(err) {
		if (err) {
			if (err.code && err.code === 11000) {
				return res.status(400).send({ "error": "duplicate product" });
			} else {
				return res.status(400).send(err);
			}
		}
		return res.status(200).send("New product created!");
	});
});

// GET ONE
router.get("/product/:id", async (req, res) => {
	const { id } = req.params;
	const data = await db.getOne(id);
	res.send(data);
});

// DELETE ONE
router.delete("/product/:id", async (req, res) => {
	const { id } = req.params;
	const data = await db.deleteOne(id);
	res.send(data);
});

// PUT i.e. REPLACE
router.put("/product", async (req, res) => {
	const { id, name, price, available } = req.body;
	const newProduct = await db.replaceOne({ id, name, price, available });
	newProduct.save(function(err) {
		if (err) {
			if (err.code && err.code === 11000) {
				return res.status(400).send({ "error": "duplicate product" });
			} else {
				return res.status(400).send(err);
			}
		}
		return res.status(200).send("Product updated!");
	});
});

module.exports = router;