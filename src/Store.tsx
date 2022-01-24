import { store } from '@risingstack/react-easy-state';
import { Product } from './interfaces';
import { getProducts } from './api';
import config from './config';

const LIMIT = config.LIMIT as number;

interface StoreInterface {
  data: Product[];
  offset: number;
  limit: number;
  count: number;
  hasMore: boolean;
  text?: string;
  getProducts: () => Promise<void>;
  setText: (text: string) => void;
  clear: () => void;
}

const Store = store<StoreInterface>({
  data: [],
  offset: 0,
  limit: LIMIT,
  count: 0,
  hasMore: true,
  setText: (text: string) => {
    Store.text = text;
  },
  getProducts: async () => {
    const { products, offset, count, hasNext } = await getProducts(Store.offset, Store.limit, Store.text);
    Store.data = [...Store.data, ...products];
    Store.offset = offset;
    Store.count = count;
    Store.hasMore = hasNext;
  },
  clear: () => {
    Store.data = [];
    Store.offset = 0;
    Store.limit = LIMIT;
    Store.count = 0;
    Store.hasMore = true;
  },
});

export default Store;
