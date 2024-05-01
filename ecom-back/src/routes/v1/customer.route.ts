import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { customerValidation } from '../../validations';
import { customerController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(customerValidation.getCustomers), customerController.getCustomers);

router
  .route('/:customerId')
  .get(auth(), validate(customerValidation.getCustomer), customerController.getCustomer);

export default router;

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management and retrieval
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of customers.
 *     tags: [Customers]
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
 *         description: Maximum number of customers per page
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
 *               $ref: '#/components/schemas/CustomerList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 * /customers/{customerId}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieve a customer by its ID.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
