export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionState {
  transactions: Transaction[];
  filter: TransactionType | 'all';
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  transactions: TransactionState;
}