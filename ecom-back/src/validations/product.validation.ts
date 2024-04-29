import Joi from 'joi';

const createProduct = {
  body: Joi.object().keys({
    // email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    // name: Joi.string().required(),
    // role: Joi.string().required().valid(Role.USER, Role.ADMIN)
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    categories: Joi.array().items(Joi.string()),
    quantity: Joi.number().required()
  })
};

const getProducts = {
  query: Joi.object().keys({
    price: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.number().integer()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      price: Joi.number(),
      description: Joi.string(),
      image: Joi.string(),
      categories: Joi.array().items(Joi.string()),
      quantity: Joi.number()
    })
    .min(1)
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.number().integer()
  })
};

export default {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
