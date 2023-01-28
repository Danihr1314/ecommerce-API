const { product } = require("../models");
const ProductServices = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductServices.getAll();
    const result = [];
    products.forEach((product) => {
      if (product.available_qty > 0) {
        result.push(product);
      }
    });
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    if (product.available_qty === 0) {
      product.status = "not_available";
    }
    const result = await ProductServices.create(product);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
};
