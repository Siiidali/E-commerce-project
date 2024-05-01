import { DiscountValueType } from '@prisma/client';
import Joi from 'joi';

const createDiscount = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    value: Joi.number().positive().required(),
    valueType: Joi.string()
      .required()
      .valid(...Object.values(DiscountValueType))
  })
};

const getDiscounts = {
  query: Joi.object().keys({
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getDiscount = {
  params: Joi.object().keys({
    discountId: Joi.number().integer()
  })
};

const updateDiscount = {
  params: Joi.object().keys({
    discountId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      code: Joi.string(),
      value: Joi.number().positive(),
      valueType: Joi.string().valid(...Object.values(DiscountValueType))
    })
    .min(1)
};

const deleteDiscount = {
  params: Joi.object().keys({
    discountId: Joi.number().integer()
  })
};

export default {
  createDiscount,
  getDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount
};
