import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, Transaction, TransactionType } from '../types';
import { deleteTransaction, setFilter, setPage } from '../store/transactionsSlice';
import TransactionDialog from './TransactionDialog';
import { shallowEqual } from 'react-redux';

export default function TransactionList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  // For multiple values
  const { filter, page, pageSize } = useSelector((state: RootState) => ({
    filter: state.transactions.filter,
    page: state.transactions.page,
    pageSize: state.transactions.pageSize
  }), shallowEqual);

  const [editTransaction, setEditTransaction] = React.useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Calculate filtered, sorted, and paginated transactions
  const filteredTransactions = React.useMemo(() => 
    transactions.filter(t => filter === 'all' || t.type === filter),
    [transactions, filter]
  );

  const sortedTransactions = React.useMemo(() =>
    [...filteredTransactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ), [filteredTransactions]
  );

  const paginatedTransactions = React.useMemo(() =>
    sortedTransactions.slice((page - 1) * pageSize, page * pageSize),
    [sortedTransactions, page, pageSize]
  );

  // Reset to first page when filter changes
  React.useEffect(() => {
    dispatch(setPage(1));
  }, [filter, dispatch]);

  const handleEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value as TransactionType | 'all'))}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <button
            onClick={() => {
              setEditTransaction(null);
              setDialogOpen(true);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Add Transaction
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {paginatedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium">{transaction.category}</span>
                <span className="text-lg font-semibold">
                  ₹{transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/transaction/${transaction.id}`)}
                className="px-3 py-1 text-sm rounded-md hover:bg-accent"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(transaction)}
                className="px-3 py-1 text-sm rounded-md hover:bg-accent"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="px-3 py-1 text-sm text-red-600 rounded-md hover:bg-accent"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet. Add your first one!
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(sortedTransactions.length / pageSize)}
        </span>
        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page * pageSize >= sortedTransactions.length}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editTransaction || undefined}
      />
    </div>
  );
}