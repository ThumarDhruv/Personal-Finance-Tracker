import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, updateTransaction } from '../store/transactionsSlice';
import { Transaction, TransactionType } from '../types';
import RichTextEditor from './RichTextEditor'
import DOMPurify from 'dompurify'

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
}

export default function TransactionForm({ transaction, onClose }: TransactionFormProps) {
  const dispatch = useDispatch();
  const [type, setType] = React.useState<TransactionType>(transaction?.type || 'expense');
  const [amount, setAmount] = React.useState(transaction?.amount.toString() || '');
  const [category, setCategory] = React.useState(transaction?.category || '');
  const [date, setDate] = React.useState(transaction?.date || new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = React.useState(transaction?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData: Transaction = {
      id: transaction?.id || crypto.randomUUID(),
      type,
      amount: parseFloat(amount),
      category,
      date,
      notes: DOMPurify.sanitize(notes),
      createdAt: transaction?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (transaction) {
      dispatch(updateTransaction(transactionData));
    } else {
      dispatch(addTransaction(transactionData));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <RichTextEditor
          value={notes}
          onChange={setNotes}
          className="w-full border rounded-md bg-white"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {transaction ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
}
