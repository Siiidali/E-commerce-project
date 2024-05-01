import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { shippingPricesService } from '../services';

const getShippingPrices = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ['title', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await shippingPricesService.queryShippingPrices({}, options);
  res.send(result);
});

const getShippingPrice = catchAsync(async (req, res) => {
  const shippingPrice = await shippingPricesService.getShippingPriceById(
    req.params.shippingPriceId
  );
  if (!shippingPrice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipping price not found');
  }
  res.send(shippingPrice);
});

const updateShippingPrice = catchAsync(async (req, res) => {
  const shippingPrice = await shippingPricesService.updateShippingPriceById(
    req.params.shippingPriceId,
    req.body.price as number
  );
  res.send(shippingPrice);
});

export default {
  getShippingPrices,
  getShippingPrice,
  updateShippingPrice
};
