import Joi from 'joi';

const getShippingPrices = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getShippingPrice = {
  params: Joi.object().keys({
    shippingPriceId: Joi.number().integer()
  })
};

const updateShippingPrice = {
  params: Joi.object().keys({
    shippingPriceId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      price: Joi.number().positive()
    })
    .min(1)
};

export default {
  getShippingPrice,
  getShippingPrices,
  updateShippingPrice
};
