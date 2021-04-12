const express = require("express");
const router = express.Router();


router.get("/products", (req, res, next) => {

	res.send("Greetings");
});

router.post("/product", (req, res, next) => {

});

router.get("/product/:id", (req, res, next) => {

});

router.delete("/product/:id", (req, res, next) => {

});

router.put("/product", (req, res, next) => {

});

module.exports = router;