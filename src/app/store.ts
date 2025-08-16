import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/login/loginSlice';
import cartSlice from './features/cart/cartSlice';
import globalSlice from './features/globalSlice';
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistCartConfig = {
  key: 'cart',
  storage
}

const persistedCart = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persister = persistStore(store)