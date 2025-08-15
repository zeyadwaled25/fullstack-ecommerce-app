import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/login/loginSlice';
import cartSlice from './features/cart/cartSlice';
import globalSlice from './features/globalSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
    global: globalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
