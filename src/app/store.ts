import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/login/loginSlice';
import cartSlice from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
