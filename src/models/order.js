const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return order.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schema:
 *     getOrders:
 *       type: array
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         total_price:
 *           type: int
 *           example: 50000
 *         user_id:
 *           type: int
 *           example: 3
 *         status:
 *           type: string
 *           example: delivered
 */

class order extends Sequelize.Model {
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
        total_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        status: {
          type: DataTypes.ENUM("delivered", "pending"),
          allowNull: true,
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        tableName: "order",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "order_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
