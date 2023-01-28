const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schema:
 *     getProducts:
 *       type: array
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         name:
 *           type: string
 *           example: Destornillador
 *         price:
 *           type: int
 *           example: 23000
 *         available_qty:
 *           type: int
 *           example: 5
 *         product_img:
 *           type: string
 *           example: http://image.com
 *         status:
 *           type: string
 *           example: available
 *         user_id:
 *           type: int
 *           example: 1
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: Daniel
 *     createProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Creatina
 *         price:
 *           type: int
 *           example: 50000
 *         available_qty:
 *           type: int
 *           example: 25
 *         product_img:
 *           type: string
 *           example: http://image.com.co
 *         user_id:
 *           type: int
 *           example: 1
 */

class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        available_qty: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_img: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("available", "not_available"),
          defaultValue: "available",
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "product",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "product_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
