const productService = require("../models/product.model");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
};

const stockTranferList = async (req, res, next) => {
  try {
    // const Branch_id = req.params.Branch_id;
    const Branch_id = req.query.Branch_id;
    const product = await productService.getstockTranferList(Branch_id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const TransferId = req.query.TransferId;
    const product = await productService.getProductById(TransferId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};
const updateStockTransferStatus = async (req, res, next) => {
  try {
    const TransferId = req.body.TransferId;
    const product = await productService.updateStockTransferStatus(TransferId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  stockTranferList,
  updateStockTransferStatus,
};
