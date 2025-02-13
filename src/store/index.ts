import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import { Transaction, TransactionType } from '../types';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
export interface TransactionState {
  transactions: Transaction[];
  filter: TransactionType | 'all';
  page: number;
  pageSize: number;  // Add this property
  loading: boolean;
  error: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;