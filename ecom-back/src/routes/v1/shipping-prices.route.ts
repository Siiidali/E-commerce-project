import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { shippingPricesValidation } from '../../validations';
import { shippingPricesController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .get(
    auth(),
    validate(shippingPricesValidation.getShippingPrices),
    shippingPricesController.getShippingPrices
  );

router
  .route('/:shippingPriceId')
  .get(
    auth(),
    validate(shippingPricesValidation.getShippingPrice),
    shippingPricesController.getShippingPrice
  )
  .patch(
    auth(),
    validate(shippingPricesValidation.updateShippingPrice),
    shippingPricesController.updateShippingPrice
  );

export default router;

/**
 * @swagger
 * /shipping-prices:
 *   get:
 *     summary: Get all shipping prices
 *     description: Retrieve a list of shipping prices.
 *     tags: [Shipping Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: "Sort by field in the format: field:(desc|asc)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of shipping prices per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShippingPrice'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /shipping-prices/{shippingPriceId}:
 *   get:
 *     summary: Get shipping price by ID
 *     description: Retrieve a shipping price by its ID.
 *     tags: [Shipping Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shippingPriceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Shipping Price ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingPrice'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update shipping price
 *     description: Update an existing shipping price.
 *     tags: [Shipping Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shippingPriceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Shipping Price ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: Shipping price
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingPrice'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
