"use strict";

const router = require("express").Router();

const { product } = require("../db/controllers");


/** GET ALL PRODUCTS
 * @openapi
 * /api/products:
 *   get:
 *     description: Gets all the products
 *     responses:
 *       200:
 *         description: Returns a list of all products.
 */
router.get("/products", async (req, res) => {
	const data = await product.gets();
	res.status(200).send(data);
});

/** POST NEW PRODUCT
 * @openapi
 * /api/product:
 *   post:
 *     description: posts a new product
 *     requestBody:
 *       required: true
 *       description: product form input
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               available:
 *                 type: boolean
 *             required:
 *               - name
 *               - available
 *     responses:
 *       201:
 *         description: Returns a list of all products.
 *       400:
 *         description: Returns duplicate error or error message on any other error type.
 */
router.post("/product", (req, res) => {
	const { name, price, available } = req.body;
	const productModel = product.createModel({ name, price, available });
	productModel.save(function(err, doc) {
		if (err) {
			if (err.code && err.code === 11000) {
				return res.status(400).send({ "error": "duplicate product" });
			} else {
				return res.status(400).send(err.message);
			}
		}
		return res.status(201).send(doc);
	});
});

/** GET A PRODUCT BY ID
 * @openapi
 * /api/product/{id}:
 *   get:
 *     description: Get a product according to search query.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of product to find
 *     responses:
 *       200:
 *         description: Returns a product.
 */
router.get("/product/:id", async (req, res) => {
	const { id } = req.params;
	const data = await product.getOne(id);
	res.send(data);
});

/** DELETE ONE PRODUCT
 * @openapi
 * /api/product/{id}:
 *   delete:
 *     description: Deletes one product according to query
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of product to delete
 *     responses:
 *       200:
 *         description: Returns an object with data 
 */
router.delete("/product/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const data = await product.deleteOne(id);
		res.status(200).send(data);
	} catch (err) {
		return res.status(400).send(err);
	}	
});

/** PUT / REPLACE A PRODUCT
 * @openapi
 * /api/product:
 *   put:
 *     description: updates or creates a new product
 *     requestBody:
 *       required: true
 *       description: product form input
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               available:
 *                 type: boolean
 *             required:
 *               - id
 *               - name
 *     responses:
 *       200:
 *         description: Returns replaced or new product.
 *       400:
 *         description: Returns duplicate error or error message on any other error type.
 */
router.put("/product", async (req, res) => {
	const { id, name, price, available } = req.body;
	try {
		// check for existing product, otherwise create one
		const newProduct = await product.createOrUpdate({ id, name, price, available });
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