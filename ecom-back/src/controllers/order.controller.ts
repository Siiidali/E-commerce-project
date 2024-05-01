import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { orderService } from '../services';
import { OrderStatus } from '@prisma/client';
import { CreateOrder } from '../types/order';

const createOrder = catchAsync(async (req, res) => {
  const orderBody = req.body as CreateOrder;
  const order = await orderService.createOrder(orderBody);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  //   const filter = pick(req.query, ['title', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders({}, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.orderId,
    req.body.status as OrderStatus
  );
  res.send(order);
});

export default {
  createOrder,
  getOrder,
  updateOrderStatus,
  getOrders
};
