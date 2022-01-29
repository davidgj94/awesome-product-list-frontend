import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, GetProductsResponse } from '../interfaces';
import * as API from '../api';
import { RootState } from './store';

interface ProductsState {
  products: Product[];
  offset: number;
  hasNext: boolean;

  text?: string;
}

const initialState: ProductsState = { products: [], hasNext: true, offset: 0 };

const fetchProducts = createAsyncThunk<GetProductsResponse | undefined, undefined, { state: RootState }>(
  'products/fetchProducts',
  async (arg, thunkApi) => {
    const {
      products: { offset, hasNext, text },
    } = thunkApi.getState();
    if (hasNext) return await API.getProducts({ offset, text });
  }
);

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: () => initialState,
    setText: (state, action: PayloadAction<string>) => ({ ...initialState, text: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (action.payload) {
        const { products, offset, hasNext } = action.payload;
        state.products.push(...products);
        state.hasNext = hasNext;
        state.offset = offset;
      }
    });
  },
});

export const actions = { ...slice.actions, fetchProducts };

export default slice.reducer;
