import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionState, TransactionType } from '../types';

const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};

const initialState: TransactionState = {
  transactions: loadTransactions(),
  filter: 'all',
  page: 1,
  pageSize: 5,
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    setFilter: (state, action: PayloadAction<TransactionType | 'all'>) => {
      state.filter = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  setLoading,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  setPage,
  setPageSize,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;