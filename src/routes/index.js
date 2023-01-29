const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const authMiddleware = require("../middlewares/auth.middleware");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/cart", cartRoutes);
};

module.exports = routerApi;
