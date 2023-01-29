const { cart, product_in_cart } = require("../models");

class CartServices {
  static async getAllProducts(userId) {
    try {
      const result = await cart.findOne({
        where: {
          user_id: userId,
        },
        attributes: ["user_id"],
        include: {
          model: product_in_cart,
          as: "product_in_carts",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartServices;
