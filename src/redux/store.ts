
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/ProductSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
    wishlist:wishlistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;