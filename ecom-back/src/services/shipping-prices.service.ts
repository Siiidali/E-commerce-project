import { ShippingPrice } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Query for shippingPrices
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryShippingPrices = async <Key extends keyof ShippingPrice>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] | null = null
): Promise<Pick<ShippingPrice, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const shippingPrices = await prisma.shippingPrice.findMany({
    where: filter,
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {},
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return shippingPrices as Pick<ShippingPrice, Key>[];
};

/**
 * Get shippingPrice by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<ShippingPrice, Key> | null>}
 */
const getShippingPriceById = async <Key extends keyof ShippingPrice>(
  id: number,
  keys: Key[] | null = null
): Promise<Pick<ShippingPrice, Key> | null> => {
  return prisma.shippingPrice.findUnique({
    where: { id },
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  }) as Promise<Pick<ShippingPrice, Key> | null>;
};

/**
 * Update shippingPrice by id
 * @param {ObjectId} shippingPriceId
 * @param {Object} price
 * @returns {Promise<ShippingPrice>}
 */
const updateShippingPriceById = async <Key extends keyof ShippingPrice>(
  shippingPriceId: number,
  price: number,
  keys: Key[] | null = null
): Promise<Pick<ShippingPrice, Key> | null> => {
  const shippingPrice = await getShippingPriceById(shippingPriceId);
  if (!shippingPrice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipping Price not found');
  }

  const updatedShippingPrice = await prisma.shippingPrice.update({
    where: { id: shippingPrice.id },
    data: {
      price
    },
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  });
  return updatedShippingPrice as Pick<ShippingPrice, Key> | null;
};

export default {
  queryShippingPrices,
  getShippingPriceById,
  updateShippingPriceById
};
