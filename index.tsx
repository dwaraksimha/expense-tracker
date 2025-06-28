import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPE DEFINITIONS ---
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

// --- CONSTANTS ---
const expenseCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
const categoryColors: { [key: string]: string } = {
  'Food': '#f97316',
  'Transport': '#0ea5e9',
  'Bills': '#8b5cf6',
  'Shopping': '#d946ef',
  'Entertainment': '#ec4899',
  'Salary': '#22c55e',
  'Freelance': '#14b8a6',
  'Investment': '#6366f1',
  'Gift': '#facc15',
  'Other': '#64748b'
};


// --- UTILITY FUNCTIONS ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// --- COMPONENTS ---

const Summary: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  return (
    <div className="card">
      <div className="summary">
        <div className="summary-item">
          <h3>Total Income</h3>
          <p id="income">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="summary-item">
          <h3>Total Expenses</h3>
          <p id="expense">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="summary-item">
          <h3>Balance</h3>
          <p id="balance">{formatCurrency(balance)}</p>
        </div>
      </div>
    </div>
  );
};

const PieChart: React.FC<{ data: { label: string, value: number, color: string }[] }> = ({ data }) => {
    if (data.length === 0) {
        return <div className="pie-chart-container empty-state">No expense data to display.</div>;
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    const gradientParts = data.map(item => {
        const percentage = (item.value / total) * 100;
        const start = cumulativePercentage;
        cumulativePercentage += percentage;
        const end = cumulativePercentage;
        return `${item.color} ${start}% ${end}%`;
    });
    const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;

    return (
        <div className="pie-chart-container">
            <div className="pie-chart" style={{ background: conicGradient }}></div>
            <div className="pie-legend">
                {data.map(item => (
                    <div key={item.label} className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};


const SpendingChart: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const expenseData = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as { [key: string]: number });

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      label: category,
      value: amount,
      color: categoryColors[category] || categoryColors['Other'],
    }));
  }, [transactions]);

  return (
    <div className="card">
      <h2>Spending by Category</h2>
      <PieChart data={expenseData} />
    </div>
  );
};


const TransactionForm: React.FC<{ onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void }> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState(expenseCategories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const availableCategories = useMemo(() => type === 'expense' ? expenseCategories : incomeCategories, [type]);

  useEffect(() => {
    // Reset category when type changes
    setCategory(availableCategories[0]);
  }, [type, availableCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      alert('Please fill all fields');
      return;
    }
    onAddTransaction({
      description,
      amount: +amount,
      type,
      category,
      date
    });
    // Reset form
    setDescription('');
    setAmount('');
  };

  return (
    <div className="card">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Coffee" required />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0.01" step="0.01" required />
        </div>
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

const TransactionList: React.FC<{ transactions: Transaction[], onDeleteTransaction: (id: string) => void }> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="card">
      <h2>History</h2>
      {transactions.length === 0 ? (
        <p className="empty-state">No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map(t => (
            <li key={t.id} className={t.type}>
              <div className="transaction-item-details">
                  <div className="description">{t.description}</div>
                  <div className="category">{t.category}</div>
                  <div className="date">{new Date(t.date).toLocaleDateString()}</div>
              </div>
              <span className={`transaction-amount ${t.type}`}>
                {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
              </span>
              <button onClick={() => onDeleteTransaction(t.id)} className="delete-btn" aria-label={`Delete transaction ${t.description}`}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage", error);
    }
  }, [transactions]);
  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>Insightful</h1>
      </header>
      <main>
        <Summary transactions={transactions} />
        <div className="content-layout">
          <div>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          <div>
            <TransactionList transactions={sortedTransactions} onDeleteTransaction={handleDeleteTransaction} />
            <SpendingChart transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root container not found");
}