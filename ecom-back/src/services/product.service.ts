import { Prisma, Product } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (
  product: Omit<Product, 'createdAt' | 'updatedAt' | 'id' | 'image'>,
  image: Express.Multer.File | undefined
): Promise<Product> => {
  return prisma.product.create({
    data: {
      ...product,
      image: image ? image.path : ''
    }
  });
};

/**
 * Query for products
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async <Key extends keyof Product>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] | null = null
): Promise<Pick<Product, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const products = await prisma.product.findMany({
    where: filter,
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {},
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return products as Pick<Product, Key>[];
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Product, Key> | null>}
 */
const getProductById = async <Key extends keyof Product>(
  id: number,
  keys: Key[] | null = null
): Promise<Pick<Product, Key> | null> => {
  return prisma.product.findUnique({
    where: { id },
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  }) as Promise<Pick<Product, Key> | null>;
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async <Key extends keyof Product>(
  productId: number,
  updateBody: Prisma.ProductUpdateInput,
  keys: Key[] | null = null
): Promise<Pick<Product, Key> | null> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (
    updateBody.title &&
    (await prisma.product.findFirst({ where: { title: updateBody.title as string | undefined } }))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: updateBody,
    select: keys ? keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}) : {}
  });
  return updatedProduct as Pick<Product, Key> | null;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId: number): Promise<Product> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await prisma.product.delete({ where: { id: product.id } });
  return product;
};

export default {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById
};
