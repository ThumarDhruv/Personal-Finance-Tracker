import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import { Transaction, TransactionType } from '../types';
import { useDispatch } from 'react-redux';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();