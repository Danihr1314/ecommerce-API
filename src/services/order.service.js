const models = require("../models");
const { order } = require("../models");

class OrderServices {
  static async getOrders(userId) {
    try {
      const result = await order.findAll({
        where: { user_id: userId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderServices;
