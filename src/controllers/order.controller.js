const OrderServices = require("../services/order.service");

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.getOrders(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getOrder };
