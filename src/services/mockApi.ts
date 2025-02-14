import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Transaction } from "../types";

const TRANSACTIONS_KEY = "transactions";
const ARTIFICIAL_DELAY = 500;

// Create axios instance
export const mockApiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 5000,
});

const getTransactionsKey = (userId: string) => `transactions_${userId}`;

const getTransactionsFromStorage = (userId: string): Transaction[] => {
  const data = localStorage.getItem(getTransactionsKey(userId)) || '[]';
  return JSON.parse(data);
};

const initializeUserTransactions = (userId: string) => {
  localStorage.setItem(getTransactionsKey(userId), '[]');
};

// Then create mock adapter
const mock = new MockAdapter(mockApiService, { delayResponse: ARTIFICIAL_DELAY });

// Mock API endpoints
mock
  .onGet(/\/transactions/).reply(200, (config: { url?: string }) => {
    const userId = new URLSearchParams(config.url?.split('?')[1]).get('userId');
    return userId ? getTransactionsFromStorage(userId) : [];
  })
  .onPost("/transactions").reply(201, (config: { data: string; url?: string }) => {
    const transaction = JSON.parse(config.data) as Transaction;
    const userId = new URLSearchParams(config.url?.split('?')[1]).get('userId');
    return userId ? addTransactionToStorage(transaction, userId) : [];
  })
  .onPut(/\/transactions\/\w+/).reply(200, (config: { data: string; url?: string }) => {
    const updatedTransaction = JSON.parse(config.data) as Transaction;
    const userId = new URLSearchParams(config.url?.split('?')[1]).get('userId');
    return userId ? updateTransactionInStorage(updatedTransaction, userId) : [];
  })
  .onDelete(/\/transactions\/\w+/).reply(200, (config: { url?: string }) => {
    const transactionId = config.url?.split("/").pop() || '';
    const userId = new URLSearchParams(config.url?.split('?')[1]).get('userId');
    return userId ? deleteTransactionFromStorage(transactionId, userId) : '';
  });

// Storage helpers
const addTransactionToStorage = async (transaction: Transaction, userId: string) => {
  try {
    const transactions = await getTransactionsFromStorage(userId);
    transactions.push(transaction);
    localStorage.setItem(getTransactionsKey(userId), JSON.stringify(transactions));
    return transaction;
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      alert("Local storage is full! Clear some data.");
    }
    throw error;
  }
};

const updateTransactionInStorage = async (updatedTransaction: Transaction, userId: string) => {
  const transactions = await getTransactionsFromStorage(userId);
  const updatedTransactions = transactions.map(t => 
    t.id === updatedTransaction.id ? updatedTransaction : t
  );
  localStorage.setItem(getTransactionsKey(userId), JSON.stringify(updatedTransactions));
  return updatedTransaction;
};

const deleteTransactionFromStorage = async (transactionId: string, userId: string) => {
  const transactions = await getTransactionsFromStorage(userId);
  const filteredTransactions = transactions.filter(t => t.id !== transactionId);
  localStorage.setItem(getTransactionsKey(userId), JSON.stringify(filteredTransactions));
  return transactionId;
};

export default mockApiService;
