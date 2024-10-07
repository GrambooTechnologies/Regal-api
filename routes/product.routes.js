const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Define the route for getting all products
router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;
