const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce en node js",
      version: "0.0.9",
      description: "API destinada para la construccion de un ecommerce",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);
