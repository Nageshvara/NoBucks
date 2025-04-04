import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export type Product = {
  _id: string;
  id:number;
  name: string;
  image: string;
  category: string;
  price: number;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const calculateCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
        toast(`Updated quantity of ${product.name} in cart`);
      } else {
        state.items.push({ product, quantity });
        toast(`Added ${product.name} to cart`);
      }
      
      const { totalItems, totalPrice } = calculateCartTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
