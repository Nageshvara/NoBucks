
import { createSlice } from '@reduxjs/toolkit';
import { toast } from "sonner";
import { CartItem } from './cartSlice';
import { UserDetails } from './authSlice';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderPlaced: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  userDetails: UserDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  orderPlaced: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderPlaced: (state) => {
      state.loading = false;
      state.error = null;
      state.orderPlaced = false;
    },
    placeOrderStart: (state) => {
      state.loading = true;
      state.error = null;
      state.orderPlaced = false;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload);
      state.orderPlaced = true;
      toast('Order placed successfully!');
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.orderPlaced = false;
      toast(action.payload);
    },
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  resetOrderPlaced,
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure
} = orderSlice.actions;

export default orderSlice.reducer;
