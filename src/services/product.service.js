const { product, users } = require("../models");

class ProductServices {
  static async getAll() {
    try {
      const result = await product.findAll({
        include: {
          model: users,
          as: "user",
          attributes: ["username"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(products) {
    try {
      const result = await product.create(products);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;
