import { Prisma, Discount } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a discount
 * @param {Object} discountBody
 * @returns {Promise<Discount>}
 */
const createDiscount = async (
  discount: Omit<Discount, 'createdAt' | 'updatedAt' | 'id' | 'active'>
): Promise<Discount> => {
  return prisma.discount.create({
    data: {
      ...discount,
      active: true
    }
  });
};

/**
 * Query for discounts
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDiscounts = async <Key extends keyof Discount>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] | null = null
): Promise<Pick<Discount, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const discounts = await prisma.discount.findMany({
    where: filter,
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {},
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return discounts as Pick<Discount, Key>[];
};

/**
 * Get discount by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Discount, Key> | null>}
 */
const getDiscountById = async <Key extends keyof Discount>(
  id: number,
  keys: Key[] | null = null
): Promise<Pick<Discount, Key> | null> => {
  return prisma.discount.findUnique({
    where: { id },
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  }) as Promise<Pick<Discount, Key> | null>;
};

/**
 * Update discount by id
 * @param {ObjectId} discountId
 * @param {Object} updateBody
 * @returns {Promise<Pick<Discount, Key> | null>}
 */
const updateDiscountById = async <Key extends keyof Discount>(
  discountId: number,
  updateBody: Prisma.DiscountUpdateInput,
  keys: Key[] | null = null
): Promise<Pick<Discount, Key> | null> => {
  const discount = await getDiscountById(discountId);
  if (!discount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
  }
  const updatedDiscount = await prisma.discount.update({
    where: { id: discount.id },
    data: updateBody,
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  });
  return updatedDiscount as Pick<Discount, Key> | null;
};

/**
 * Delete discount by id
 * @param {ObjectId} discountId
 * @returns {Promise<Discount>}
 */
const deleteDiscountById = async (discountId: number): Promise<Discount> => {
  const discount = await getDiscountById(discountId);
  if (!discount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found');
  }
  await prisma.discount.delete({ where: { id: discount.id } });
  return discount;
};

export default {
  createDiscount,
  queryDiscounts,
  getDiscountById,
  updateDiscountById,
  deleteDiscountById
};
