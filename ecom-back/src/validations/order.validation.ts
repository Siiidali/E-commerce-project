import { OrderStatus } from '@prisma/client';
import Joi from 'joi';

const createOrder = {
  body: Joi.object().keys({
    customer: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      wilaya: Joi.string().required()
    }),
    products: Joi.array().items(
      Joi.object().keys({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().positive().required()
      })
    ),

    total: Joi.number().required()
  })
};

const getOrders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().integer()
  })
};

const updateOrderStatus = {
  params: Joi.object().keys({
    orderId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    status: Joi.string()
      .required()
      .valid(...Object.values(OrderStatus))
  })
};

export default {
  createOrder,
  getOrder,
  getOrders,
  updateOrderStatus
};
