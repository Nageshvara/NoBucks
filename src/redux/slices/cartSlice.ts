import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export type Product = {
  _id: string;
  id:number;
  name: string;
  image: string;
  category: string;
  price: number;
  description:string;
  rating:number;
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

const removeItemFromCart = (state: CartState, productId: string) => {
  const itemToRemove = state.items.find(item => item.product._id === productId);
  
  if (itemToRemove) {
    toast(`Removed ${itemToRemove.product.name} from cart`);
    state.items = state.items.filter(item => item.product._id !== productId);

    const { totalItems, totalPrice } = calculateCartTotals(state.items);
    state.totalItems = totalItems;
    state.totalPrice = totalPrice;

    localStorage.setItem('cart', JSON.stringify(state.items));
  }
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
    removeFromCart: (state, action: PayloadAction<string>) => {
      removeItemFromCart(state, action.payload);
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
    
      if (quantity <= 0) {
        removeItemFromCart(state, productId);
        return;
      }
    
      const item = state.items.find(item => item.product._id === productId);
      if (item) {
        item.quantity = quantity;
    
        const { totalItems, totalPrice } = calculateCartTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
    
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
      toast('Cart cleared');
    },
    
    initializeCartFromLocalStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          state.items = JSON.parse(savedCart);
          const { totalItems, totalPrice } = calculateCartTotals(state.items);
          state.totalItems = totalItems;
          state.totalPrice = totalPrice;
        } catch (error) {
          console.error('Failed to parse saved cart:', error);
        }
      }
    },
  },
});

export const { addToCart,removeFromCart,updateQuantity,clearCart,initializeCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
