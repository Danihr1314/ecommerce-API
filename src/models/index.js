const initModels = require("./init-models");
const db = require("../utils/database");

const models = initModels(db);

const { users, product, product_in_cart, product_in_order, order, cart } =
  models;

module.exports = models;
