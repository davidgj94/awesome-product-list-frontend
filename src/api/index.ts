import { GetProductsResponse } from '../interfaces';
import config from '../config';
import axios from 'axios';

const PRODUCTS_ENDPOINT = `${config.BACKEND_URL}/api/v1/product`;

export const getProducts = async (skip: number, limit: number, text?: string): Promise<GetProductsResponse> => {
  const { data } = await axios.get<GetProductsResponse>(PRODUCTS_ENDPOINT, {
    params: {
      skip,
      limit,
      text,
    },
  });
  return data;
};
