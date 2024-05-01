import { Customer } from '@prisma/client';
import prisma from '../client';

/**
 * Create a customer
 * @param {Object} customerBody
 * @returns {Promise<Customer>}
 */
const createCustomer = async (
  customer: Omit<Customer, 'createdAt' | 'updatedAt' | 'id'>
): Promise<Customer> => {
  return prisma.customer.create({
    data: {
      ...customer
    }
  });
};

/**
 * Query for customers
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCustomers = async (
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  }
  //   keys: Key[] | null = null
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const customers = await prisma.customer.findMany({
    where: filter,
    // select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {},
    include: {
      orders: true
    },
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return customers;
};

/**
 * Get customer by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Customer | null>}
 */
const getCustomerById = async (
  id: number
  //   keys: Key[] | null = null
): Promise<Customer | null> => {
  return prisma.customer.findUnique({
    where: { id },
    // select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
    include: {
      orders: true
    }
  }) as Promise<Customer | null>;
};

export default {
  queryCustomers,
  getCustomerById,
  createCustomer
};
