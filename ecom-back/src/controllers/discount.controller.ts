import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { discountService } from '../services';
import { Discount } from '@prisma/client';

const createDiscount = catchAsync(async (req, res) => {
  const discountBody = req.body.discount as Omit<
    Discount,
    'createdAt' | 'updatedAt' | 'id' | 'active'
  >;
  const discount = await discountService.createDiscount(discountBody);
  res.status(httpStatus.CREATED).send(discount);
});

const getDiscounts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await discountService.queryDiscounts(filter, options);
  res.send(result);
});

const getDiscount = catchAsync(async (req, res) => {
  const discount = await discountService.getDiscountById(req.params.discountId);
  if (!discount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
  }
  res.send(discount);
});

const updateDiscount = catchAsync(async (req, res) => {
  const discount = await discountService.updateDiscountById(req.params.discountId, req.body);
  res.send(discount);
});

const deleteDiscount = catchAsync(async (req, res) => {
  await discountService.deleteDiscountById(req.params.discountId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createDiscount,
  getDiscounts,
  getDiscount,
  updateDiscount,
  deleteDiscount
};
