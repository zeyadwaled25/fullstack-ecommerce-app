import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './features/login/loginSlice';
import cartSlice from './features/cart/cartSlice';
import globalSlice from './features/globalSlice';
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { apiSlice } from './services/apiSlice';

const persistCartConfig = {
  key: 'cart',
  storage
}

const persistedCart = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persister = persistStore(store)