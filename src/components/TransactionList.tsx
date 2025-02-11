import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, Transaction } from '../types';
import { deleteTransaction } from '../store/transactionsSlice';
import TransactionDialog from './TransactionDialog';

export default function TransactionList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const [editTransaction, setEditTransaction] = React.useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

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

      <div className="space-y-2">
        {transactions.map((transaction) => (
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

        {transactions.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet. Add your first one!
          </p>
        )}
      </div>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editTransaction || undefined}
      />
    </div>
  );
}