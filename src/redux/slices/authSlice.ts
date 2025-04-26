
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
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action: PayloadAction<{ userId: string; username: string }>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.loading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('username', action.payload.username);
      toast('Successfully logged in');
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast(action.payload);
    },
    
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    registerSuccess: (state, action: PayloadAction<{ userId: string; username: string }>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.loading = false;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('username', action.payload.username);
      toast('Successfully registered and logged in');
    },
    
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast(action.payload);
    },
    
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.username = null;
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('token');
      localStorage.removeItem('uname')
      toast('Successfully logged out');
    },
    
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
    
    updateUserDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    updateUserDetailsSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.loading = false;
      state.userDetails = action.payload;
      localStorage.setItem('userDetails', JSON.stringify(action.payload));
    },
    
    updateUserDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      toast(action.payload);
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout, 
  setUserDetails,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFailure
} = authSlice.actions;

export default authSlice.reducer;