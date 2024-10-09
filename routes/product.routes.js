const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Define the route for getting all products
router.get("/getAllProducts", productController.getAllProducts);
router.get("/stockTranferList", productController.stockTranferList);
router.get("/getProductById", productController.getProductById);
router.post(
  "/updateStockTransferStatus",
  productController.updateStockTransferStatus
);

module.exports = router;
