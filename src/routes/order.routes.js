const { Router } = require("express");
const { getOrder } = require("../controllers/order.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/orders/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of the user orders
 *     tags: [Order]
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
 *               $ref: '#/components/schema/getOrders'
 *       400:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: something went wrong / order not found / order does not exist
 */

router.get("/:id", getOrder);

module.exports = router;
