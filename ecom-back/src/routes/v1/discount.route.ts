import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { discountValidation } from '../../validations';
import { discountController } from '../../controllers';
const router = express.Router();

router
  .route('/')
  .post(auth(), validate(discountValidation.createDiscount), discountController.createDiscount)
  .get(auth(), validate(discountValidation.getDiscounts), discountController.getDiscounts);

router
  .route('/:discountId')
  .get(auth(), validate(discountValidation.getDiscount), discountController.getDiscount)
  .patch(auth(), validate(discountValidation.updateDiscount), discountController.updateDiscount)
  .delete(auth(), validate(discountValidation.deleteDiscount), discountController.deleteDiscount);

export default router;

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management and retrieval
 */

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a discount
 *     description: Create a new discount.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscount'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Discount'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all discounts
 *     description: Retrieve a list of discounts.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Discount title
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: Discount price
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: "Sort by field in the format: field:(desc|asc)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of discounts per page
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
 *               $ref: '#/components/schemas/DiscountList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /discounts/{discountId}:
 *   get:
 *     summary: Get discount by ID
 *     description: Retrieve a discount by its ID.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update discount
 *     description: Update an existing discount.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountUpdate'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete discount
 *     description: Delete an existing discount.
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Discount ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
