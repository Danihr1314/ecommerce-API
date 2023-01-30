const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return cart.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schema:
 *     getCartProducts:
 *       type: object
 *       properties:
 *         user_id:
 *           type: int
 *           example: 1
 *         product_in_carts:
 *           type: array
 *           properties:
 *             id:
 *               type: int
 *               example: 2
 *             cart_id:
 *               type: int
 *               example: 2
 *             product_id:
 *               type: int
 *               example: 5
 *             quantity:
 *               type: int
 *               example: 4
 *             price:
 *               type: int
 *               example: 34000
 *             status:
 *               type: string
 *               example: pending_purchase
 *     addProductToCart:
 *       type: object
 *       properties:
 *         userId:
 *           type: int
 *           example: 1
 *         productId:
 *           type: int
 *           example: 4
 *         quantity:
 *           type: int
 *           example: 5
 */

class cart extends Sequelize.Model {
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
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        total_price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        cart_status: {
          type: DataTypes.ENUM("purchased", "pending_purchase"),
          allowNull: true,
          defaultValue: "pending_purchase",
        },
      },
      {
        sequelize,
        tableName: "cart",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "cart_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
