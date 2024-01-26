// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Use getDefaultMiddleware to include other default middlewares
});

export default store;
