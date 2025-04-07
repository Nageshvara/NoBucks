import { createSlice } from '@reduxjs/toolkit';
import { Product } from './cartSlice';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}


const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;