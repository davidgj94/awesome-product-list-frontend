import { GetProductsResponse, GetProductsRequest, GetFavoritesResponse, SaveFavoriteResponse } from '../interfaces';
import config from '../config';
import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({ baseURL: `${config.BACKEND_URL}/api/v1` });

export const setAuth = (accessToken?: string | null) =>
  accessToken &&
  axiosInstance.interceptors.request.use((config) => {
    config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
  });

const handleResponse = <T>(axiosPromise: Promise<AxiosResponse<T>>) => axiosPromise.then(({ data }) => data);

export const getProducts = (data: Omit<GetProductsRequest, 'limit'> & { limit?: number }) => {
  data = { limit: config.LIMIT, ...data };
  return handleResponse(axiosInstance.request<GetProductsResponse>({ url: '/products', data, method: 'GET' }));
};

export const saveFavorite = (productId: string) =>
  handleResponse(axiosInstance.request<SaveFavoriteResponse>({ url: `/products/${productId}/fav`, method: 'POST' }));

export const getFavorites = () =>
  handleResponse(axiosInstance.request<GetFavoritesResponse>({ url: '/products/favorites', method: 'GET' }));
