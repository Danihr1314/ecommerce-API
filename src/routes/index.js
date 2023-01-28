const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const authMiddleware = require("../middlewares/auth.middleware");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productRoutes);
};

module.exports = routerApi;
