
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';
import { toast } from "sonner";

interface WishlistState {
  wishlist: Product[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (!exists) {
        state.wishlist.push(action.payload);
        toast('Added to wishlist');
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(item => item._id !== action.payload);
      toast('Removed from wishlist');
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;