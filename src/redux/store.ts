import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favSlice';
import productsReducer from './productSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
