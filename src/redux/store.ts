import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { actions as favActions } from './favSlice';
import productsReducer, { actions as productActions } from './productSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

export const actions = { productActions, favActions };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
