import Joi from 'joi';

const getCustomers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCustomer = {
  params: Joi.object().keys({
    customerId: Joi.number().integer()
  })
};
export default {
  getCustomer,
  getCustomers
};
