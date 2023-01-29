//models
const { cart, product, product_in_cart } = require("../models");
const CartServices = require("../services/cart.service");

const addProduct = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const Product = await product.findOne({
      where: { id: productId, status: "available" },
    });
    if (!Product) {
      res.status(400).json({ message: "Invalid product" });
    } else if (quantity > Product.quantity) {
      res.status(400).json({
        message: `This product only has ${Product.quantity} items on stock`,
      });
    }

    const price = Product.price * quantity;

    const Cart = await cart.findOne({
      where: { user_id: userId, cart_status: "pending_purchase" },
    });
    if (!Cart) {
      const newCart = await cart.create({
        user_id: userId,
        total_price: price,
      });
      await product_in_cart.create({
        cart_id: newCart.id,
        product_id: productId,
        quantity: quantity,
        price: price,
      });
      return res.status(201).json({ message: "Success" });
    }

    if (Cart) {
      const productExist = await product_in_cart.findOne({
        where: { cart_id: Cart.id, productId },
      });
      if (!productExist) {
        await product_in_cart.create({
          cart_id: Cart.id,
          product_id: productId,
          quantity: quantity,
          price: price,
        });
        return res.status(201).json({ message: "Success" });
      }
      if (productExist.status === "pending_purchase") {
        await productExist.update({
          status: "purchased",
        });
        return res
          .status(200)
          .json({ status: "Success", message: "Product added" });
      }
      if (productExist.status === "purchased") {
        return res.status(400).json({ message: "This product already exist" });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await CartServices.getAllProducts(userId);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProduct,
  getAll,
};
