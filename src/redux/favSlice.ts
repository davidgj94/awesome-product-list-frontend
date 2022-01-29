import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../interfaces';
import * as API from '../api';

interface FavState {
  products: Product[];
}

const initialState: FavState = { products: [] };

const saveFavorite = createAsyncThunk(
  'favorites/SaveFav',
  async (productId: string) => await API.saveFavorite(productId)
);

const getFavorites = createAsyncThunk('favorites/getFavs', async () => await API.getFavorites());

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });

    builder.addCase(saveFavorite.fulfilled, (state, action) => {
      const { isFavorite, product } = action.payload;
      if (isFavorite) {
        state.products.push(product);
      } else {
        state.products = state.products.filter((p) => p._id !== product._id);
      }
    });
  },
});

export const actions = { ...slice.actions, saveFavorite, getFavorites };

export default slice.reducer;
