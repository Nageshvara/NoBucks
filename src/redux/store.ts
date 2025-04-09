import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; 
import productReducer from './slices/ProductSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products:productReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
