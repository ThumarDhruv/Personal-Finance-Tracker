import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#4ade80', '#f87171'],
        borderColor: ['#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <dl className="grid gap-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Income</dt>
              <dd className="font-medium text-green-600">₹{income.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Expenses</dt>
              <dd className="font-medium text-red-600">₹{expenses.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2">
              <dt className="font-medium">Balance</dt>
              <dd className="font-medium">₹{(income - expenses).toFixed(2)}</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Income vs Expenses</h3>
          <div className="aspect-square">
            <Pie data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-muted-foreground">No transactions yet. Add your first one!</p>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center p-4 bg-accent rounded-md">
                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <p className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ₹{transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}