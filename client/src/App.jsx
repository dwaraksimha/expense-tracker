import React, { useState, useEffect } from 'react';
     import axios from 'axios';
     import { Pie } from 'react-chartjs-2';
     import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
     import { ToastContainer, toast } from 'react-toastify';
     import 'react-toastify/dist/ReactToastify.css';
     import './App.css';

     ChartJS.register(ArcElement, Tooltip, Legend);

     const App = () => {
       const [expenses, setExpenses] = useState([]);
       const [form, setForm] = useState({ id: null, title: '', amount: '', date: '', category: '' });
       const [error, setError] = useState('');
       const [loading, setLoading] = useState(false);
       const [formErrors, setFormErrors] = useState({});

       useEffect(() => {
         fetchExpenses();
       }, []);

       const fetchExpenses = async () => {
         setLoading(true);
         try {
           const response = await axios.get('http://localhost:5000/api/expenses');
           setExpenses(response.data);
           setError('');
         } catch (err) {
           const errorMessage = err.response?.data?.error || err.message;
           setError(`Failed to fetch expenses: ${errorMessage}`);
           console.error('Fetch error:', err);
         } finally {
           setLoading(false);
         }
       };

       const validateForm = () => {
         const errors = {};
         if (!form.title || form.title.trim().length === 0) {
           errors.title = 'Title is required';
         }
         if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
           errors.amount = 'Amount must be a positive number';
         }
         if (!form.date || !/^\d{4}-\d{2}-\d{2}$/.test(form.date)) {
           errors.date = 'Date must be in YYYY-MM-DD format';
         }
         const validCategories = ['Food', 'Transport', 'Utilities', 'Entertainment'];
         if (!form.category || !validCategories.includes(form.category)) {
           errors.category = 'Please select a valid category';
         }
         setFormErrors(errors);
         return Object.keys(errors).length === 0;
       };

       const handleInputChange = (e) => {
         setForm({ ...form, [e.target.name]: e.target.value });
         setFormErrors({ ...formErrors, [e.target.name]: '' });
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         if (!validateForm()) return;

         setLoading(true);
         try {
           if (form.id) {
             await axios.put(`http://localhost:5000/api/expenses/${form.id}`, form);
             toast.success('Expense updated successfully!');
           } else {
             await axios.post('http://localhost:5000/api/expenses', form);
             toast.success('Expense added successfully!');
           }
           setForm({ id: null, title: '', amount: '', date: '', category: '' });
           setError('');
           fetchExpenses();
         } catch (err) {
           const errorMessage = err.response?.data?.error || err.message;
           setError(`Failed to save expense: ${errorMessage}`);
           toast.error(`Failed to save expense: ${errorMessage}`);
           console.error('Save error:', err);
         } finally {
           setLoading(false);
         }
       };

       const handleEdit = (expense) => {
         setForm(expense);
         window.scrollTo({ top: 0, behavior: 'smooth' });
       };

       const handleDelete = async (id) => {
         setLoading(true);
         try {
           await axios.delete(`http://localhost:5000/api/expenses/${id}`);
           toast.success('Expense deleted successfully!');
           fetchExpenses();
         } catch (err) {
           const errorMessage = err.response?.data?.error || err.message;
           setError(`Failed to delete expense: ${errorMessage}`);
           toast.error(`Failed to delete expense: ${errorMessage}`);
           console.error('Delete error:', err);
         } finally {
           setLoading(false);
         }
       };

       const categories = ['Food', 'Transport', 'Utilities', 'Entertainment'];
       const chartData = {
         labels: categories,
         datasets: [{
           label: 'Expenses by Category ($)',
           data: categories.map(category =>
             expenses
               .filter(exp => exp.category === category)
               .reduce((sum, exp) => sum + Number(exp.amount), 0)
           ),
           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
           hoverOffset: 20,
         }],
       };
       const chartOptions = {
         plugins: {
           legend: { position: 'top' },
           tooltip: {
             callbacks: {
               label: (context) => `${context.label}: $${context.raw.toFixed(2)}`,
             },
           },
         },
         maintainAspectRatio: false,
       };

       return (
         <div className="container">
           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
           <h1>Expense Tracker</h1>
           {error && <p className="error">{error}</p>}
           {loading && <p className="loading">Loading...</p>}
           <form onSubmit={handleSubmit}>
             <div className="form-grid">
               <div>
                 <input
                   type="text"
                   name="title"
                   value={form.title}
                   onChange={handleInputChange}
                   placeholder="Title"
                 />
                 {formErrors.title && <p className="form-error">{formErrors.title}</p>}
               </div>
               <div>
                 <input
                   type="number"
                   name="amount"
                   value={form.amount}
                   onChange={handleInputChange}
                   placeholder="Amount"
                 />
                 {formErrors.amount && <p className="form-error">{formErrors.amount}</p>}
               </div>
               <div>
                 <input
                   type="date"
                   name="date"
                   value={form.date}
                   onChange={handleInputChange}
                 />
                 {formErrors.date && <p className="form-error">{formErrors.date}</p>}
               </div>
               <div>
                 <select name="category" value={form.category} onChange={handleInputChange}>
                   <option value="">Select Category</option>
                   <option value="Food">Food</option>
                   <option value="Transport">Transport</option>
                   <option value="Utilities">Utilities</option>
                   <option value="Entertainment">Entertainment</option>
                 </select>
                 {formErrors.category && <p className="form-error">{formErrors.category}</p>}
               </div>
             </div>
             <button type="submit" disabled={loading}>
               {loading ? 'Saving...' : form.id ? 'Update Expense' : 'Add Expense'}
             </button>
           </form>
           <div className="expense-list">
             {expenses.length > 0 ? (
               expenses.map((expense) => (
                 <div key={expense.id} className="expense-item">
                   <div>
                     <h2>{expense.title}</h2>
                     <p>Amount: ${expense.amount}</p>
                     <p>Date: {expense.date}</p>
                     <p>Category: {expense.category}</p>
                   </div>
                   <div>
                     <button onClick={() => handleEdit(expense)} disabled={loading}>Edit</button>
                     <button onClick={() => handleDelete(expense.id)} disabled={loading}>Delete</button>
                   </div>
                 </div>
               ))
             ) : (
               <p>No expenses found. Add some expenses to get started.</p>
             )}
           </div>
           <div className="chart">
             <h2>Expense Breakdown</h2>
             {expenses.length > 0 ? (
               <div className="chart-container">
                 <Pie data={chartData} options={chartOptions} />
               </div>
             ) : (
               <p>No data available for the chart. Add expenses to see the breakdown.</p>
             )}
           </div>
         </div>
       );
     };

     export default App;