//models
const { users, cart, product, product_in_cart, order } = require("../models");
const CartServices = require("../services/cart.service");
const trasnporter = require("../utils/mailer");

//Add a product in the user cart -----------------------------------------------------------------------------------
const addProduct = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const Product = await product.findOne({
      where: { id: productId, status: "available" },
    });
    if (!Product) {
      res.status(400).json({ message: "Invalid product" });
    } else if (quantity > Product.quantity) {
      res.status(400).json({
        message: `This product only has ${Product.quantity} items on stock`,
      });
    }

    const price = Product.price * quantity;

    const Cart = await cart.findOne({
      where: { user_id: userId, cart_status: "pending_purchase" },
    });
    if (!Cart) {
      const newCart = await cart.create({
        user_id: userId,
        total_price: price,
      });
      await product_in_cart.create({
        cart_id: newCart.id,
        product_id: productId,
        quantity: quantity,
        price: price,
      });
      return res.status(201).json({ message: "Success" });
    }

    if (Cart) {
      const productExist = await product_in_cart.findOne({
        where: { cart_id: Cart.id, productId },
      });
      if (!productExist) {
        await product_in_cart.create({
          cart_id: Cart.id,
          product_id: productId,
          quantity: quantity,
          price: price,
        });
        return res.status(201).json({ message: "Success" });
      }
      if (productExist.status === "pending_purchase") {
        await productExist.update({
          status: "purchased",
        });
        return res
          .status(200)
          .json({ status: "Success", message: "Product added" });
      }
      if (productExist.status === "purchased") {
        return res.status(400).json({ message: "This product already exist" });
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get all user products in her cart ---------------------------------------------------------------------
const getAll = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CartServices.getAllProducts(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Purchase cart -----------------------------------------------------------------------------------------
const purchase = async (req, res) => {
  try {
    const { userId } = req.body;
    const findCart = await cart.findAll({
      where: { user_id: userId, cart_status: "pending_purchase" },
      attributes: ["id", "user_id", "cart_status"],
      include: [
        {
          model: product_in_cart,
          as: "product_in_carts",
          where: { status: "pending_purchase" },
          attributes: ["id", "cart_id", "product_id", "quantity", "status"],
          required: false,
          include: [
            {
              model: product,
              as: "product",
              required: false,
              where: { status: "available" },
              attributes: ["name", "price", "user_id", "available_qty"],
            },
          ],
        },
      ],
    });
    //console.log(findCart[0]?.dataValues?.id);
    if (!findCart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    let totalQuantity = 0;
    let caclPrice = 0;
    let finalPrice = 0;

    for (
      let index = 0;
      index < findCart[0].dataValues.product_in_carts[0].dataValues.length;
      index++
    ) {
      totalQuantity +=
        +findCart[0].dataValues.product_in_carts[0].dataValues.quantity;
      caclPrice +=
        +findCart[0].dataValues.product_in_carts[0].dataValues.product
          .dataValues.price;
      finalPrice +=
        +findCart[0].dataValues.product_in_carts[0].dataValues.quantity *
        +findCart[0].dataValues.product_in_carts[0].dataValues.product
          .dataValues.price;
    }

    const updateQtyOnProduct =
      findCart[0]?.dataValues?.product_in_carts[0]?.dataValues?.map(
        async (prod) => {
          const findProduct = await product.findOne({
            where: { product_id: prod.id, status: "available" },
          });
          const resta = prod.product.dataValues.available_qty - prod.quantity;
          await findProduct.update({
            quantity: resta,
          });

          return await prod.update({ status: "purchased" });
        }
      );
    await findCart[0].dataValues.update({
      cart_status: "purchased",
    });

    await Promise.all(updateQtyOnProduct);

    const Order = await order.create({
      user_id: userId,
      cart_id: findCart[0].dataValues.id,
      total_price: finalPrice,
      status: "purchased",
    });

    const infoUser = await users.findOne({
      where: { id: userId },
    });

    await trasnporter.sendMail({
      to: infoUser.email,
      from: "danihr1314@gmail.com",
      subject: "Purchase realized",
      html: `<h1>Purchase realized successfully!</h1><p>Felicidades, acabas de realizar una compra</p>`,
    });
    res.json({
      status: "success",
      message: "Purchased",
      findCart,
      Order,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProduct,
  getAll,
  purchase,
};
