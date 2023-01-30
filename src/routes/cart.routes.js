const { Router } = require("express");
const { addProduct, getAll } = require("../controllers/cart.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/cart/{id}:
 *   get:
 *     summary: Returns a list of products in the user cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The user ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/getCartProducts'
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong / user not found / user does not exist
 * /api/v1/cart/add-product:
 *   post:
 *     summary: add a product
 *     tags: [Cart]
 *     requestBody:
 *       description: Required fields to add a product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/addProductToCart'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong
 */

router.get("/:id", getAll);
router.post("/add-product", addProduct);

module.exports = router;
