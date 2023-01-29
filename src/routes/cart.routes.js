const { Router } = require("express");
const { addProduct, getAll } = require("../controllers/cart.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     summary: Returns a list of products with a quantity > to 0
 *     tags: [Cart]
 *     requestBody:
 *       description: Put user id to find her products in cart
 *       required: true
 *       content:
 *         application/json
 *           shcema:
 *             $ref: '#/components/schema/getCartProducts'
 *     responses:
 *       200:
 *         description: A JSON array with products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/getProducts'
 *       400:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request, products not found
 *   post:
 *     summary: create product
 *     tags: [Cart]
 *     requestBody:
 *       description: Required fields to create a product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/createProduct'
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
 *                   example: Product created
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

router.get("/products", getAll);
router.post("/add-product", addProduct);

module.exports = router;
