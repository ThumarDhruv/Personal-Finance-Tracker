import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';
import { deleteTransaction } from '../store/transactionsSlice';
import { Link, useNavigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

export default function TransactionDetails() {
  const { id } = useParams();
  const transaction = useSelector((state: RootState) => 
    state.transactions.transactions.find(t => t.id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Transaction Details</h2>
      <div className="bg-card p-6 rounded-lg shadow">
        <dl className="grid gap-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Type</dt>
            <dd className="text-lg">{transaction.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Amount</dt>
            <dd className="text-lg">₹{transaction.amount.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
            <dd className="text-lg">{transaction.category}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Date</dt>
            <dd className="text-lg">{new Date(transaction.date).toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Notes</dt>
            <dd className="prose">
              <div 
                dangerouslySetInnerHTML={{ __html: transaction.notes }} 
                className="mt-1 prose dark:prose-invert leading-snug ql-editor"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex gap-4 mt-6">
        <Link to="/transactions" className="px-4 py-2 border rounded-md">
          &larr; Back
        </Link>
        {/* <button
          onClick={() => navigate(`/transaction/${transaction.id}/edit`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {/* Edit */}
      
        <button
          onClick={() => {
            dispatch(deleteTransaction(transaction.id));
            navigate('/transactions');
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}