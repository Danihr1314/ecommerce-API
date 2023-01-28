const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product_in_cart.init(sequelize, DataTypes);
}

class product_in_cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("purchased","pending_purchase"),
      allowNull: true,
      defaultValue: "pending_purchase"
    }
  }, {
    sequelize,
    tableName: 'product_in_cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_in_cart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
