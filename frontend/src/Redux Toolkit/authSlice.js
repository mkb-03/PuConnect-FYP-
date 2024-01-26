// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null, // Add a token field to the state
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token; // Set the token upon login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // Clear the token upon logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
