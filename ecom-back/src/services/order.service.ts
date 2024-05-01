import { Order, OrderStatus } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { CreateOrder } from '../types/order';
import customerService from './customer.service';

/**
 * Create an order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (order: CreateOrder): Promise<Order> => {
  const customer = await customerService.createCustomer(order.customer);

  return prisma.order.create({
    data: {
      customer: {
        connect: {
          id: customer.id
        }
      },
      total: order.total,
      status: OrderStatus.PENDING,
      products: {
        create: order.products.map((product) => ({
          quantity: product.quantity,
          product: {
            connect: {
              id: product.productId
            }
          }
        }))
      }
    }
  });
};

/**
 * Query for orders
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  }
): Promise<Order[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const orders = await prisma.order.findMany({
    where: filter,
    include: {
      customer: true,
      products: {
        include: {
          product: true
        }
      }
    },
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return orders as Order[];
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Order | null>}
 */
const getOrderById = async (id: number): Promise<Order | null> => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      products: {
        include: {
          product: true
        }
      }
    }
  }) as Promise<Order | null>;
};

/**
 * Update Order Status
 * @param {ObjectId} id
 * @param {OrderStatus} status
 * @returns {Promise<Pick<Order, Key> | null>}
 */
const updateOrderStatus = async (id: number, status: OrderStatus): Promise<Order> => {
  const order = getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return prisma.order.update({
    where: { id },
    data: { status }
  });
};

export default {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderStatus
};
