import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import productRoute from './product.route';
import orderRoute from './order.route';
import customerRoute from './customer.route';
import shippingPricesRoute from './shipping-prices.route';
import docsRoute from './docs.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/orders',
    route: orderRoute
  },
  {
    path: '/customers',
    route: customerRoute
  },
  {
    path: '/shipping-prices',
    route: shippingPricesRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
