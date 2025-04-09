import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "sonner";

export type UserDetails = {
  email: string;
  phone: string;
  address: string;
  pincode: string;
};

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  username: string | null;
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
}


const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  userDetails: JSON.parse(localStorage.getItem('userDetails') || 'null'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.username = null;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      toast('Successfully logged out');
    },
    
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
  },
});

export const { logout, setUserDetails } = authSlice.actions;
export default authSlice.reducer;