import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionState, TransactionType } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockApiService } from '../services/mockApi';

const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  console.log("Loading transactions from localStorage:", stored);
  return stored ? JSON.parse(stored) : [];
};

const initialState: TransactionState = {
  transactions: loadTransactions(),
  filter: 'all',
  page: 1,
  pageSize: 10,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      });
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

export const fetchTransactionsAsync = createAsyncThunk(
  'transactions/fetchAll',
  async (userId: string) => {
    const response = await mockApiService.get(`/transactions?userId=${userId}`);
    return response.data;
  }
);

export default transactionsSlice.reducer;