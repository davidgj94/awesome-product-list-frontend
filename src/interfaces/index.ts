export interface Product {
  _id: string;
  name: string;
  oldPrice: number;
  price: number;
  restaurant: Restaurant;
  discountName: string;
  volume: number;
  lastOrderDate: Date;
}

export interface Restaurant {
  name: string;
  location: string;
}

export interface GetProductsResponse {
  products: Product[];
  hasNext: boolean;
  offset: number;
  count: number;
}

export interface GetProductsRequest {
  offset: number;
  limit: number;
  text?: string;
}

export interface SaveFavoriteResponse {
  product: Product;
  isFavorite: boolean;
}

export interface GetFavoritesResponse {
  products: Product[];
}
