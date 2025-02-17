import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import "react-quill/dist/quill.snow.css";
export default function TransactionDetails() {
  const { id } = useParams();
  const transaction = useSelector((state: RootState) => 
    state.transactions.transactions.find(t => t.id === id)
  );

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
                className="mt-1 prose dark:prose-invert leading-snug ql-editor"
                dangerouslySetInnerHTML={{ __html: transaction.notes }} 
                // className="[&_ul]:list-disc [&_ol]:list-decimal pl-4"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}