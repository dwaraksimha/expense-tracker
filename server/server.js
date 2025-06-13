const express = require('express');
     const sqlite3 = require('sqlite3').verbose();
     const cors = require('cors');
     const dotenv = require('dotenv');

     dotenv.config();
     const app = express();

     app.use(cors({ origin: 'http://localhost:5173' }));
     app.use(express.json());

     const db = new sqlite3.Database('./database.db', (err) => {
       if (err) {
         console.error('Failed to connect to SQLite database:', err.message);
         process.exit(1);
       }
       console.log('Connected to SQLite database');
     });

     db.serialize(() => {
       db.run(
         `CREATE TABLE IF NOT EXISTS expenses (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           title TEXT NOT NULL,
           amount REAL NOT NULL,
           date TEXT NOT NULL,
           category TEXT NOT NULL
         )`,
         (err) => {
           if (err) {
             console.error('Failed to create table:', err.message);
           } else {
             console.log('Expenses table created or already exists');
           }
         }
       );

       db.get('SELECT COUNT(*) as count FROM expenses', (err, row) => {
         if (err) {
           console.error('Failed to check table count:', err.message);
           return;
         }
         if (row.count === 0) {
           const sampleData = [
             { title: 'Groceries', amount: 120.50, date: '2025-06-01', category: 'Food' },
             { title: 'Bus Ticket', amount: 15.00, date: '2025-06-02', category: 'Transport' },
             { title: 'Internet Bill', amount: 60.00, date: '2025-06-03', category: 'Utilities' },
             { title: 'Coffee Shop', amount: 7.50, date: '2025-06-04', category: 'Food' },
             { title: 'Movie Ticket', amount: 20.00, date: '2025-06-05', category: 'Entertainment' },
             { title: 'Dinner Out', amount: 45.30, date: '2025-06-06', category: 'Food' },
             { title: 'Taxi Ride', amount: 25.00, date: '2025-06-07', category: 'Transport' },
             { title: 'Electricity Bill', amount: 80.00, date: '2025-06-08', category: 'Utilities' },
             { title: 'Concert Ticket', amount: 50.00, date: '2025-06-09', category: 'Entertainment' },
             { title: 'Grocery Shopping', amount: 90.75, date: '2025-06-10', category: 'Food' }
           ];

           const stmt = db.prepare('INSERT INTO expenses (title, amount, date, category) VALUES (?, ?, ?, ?)');
           sampleData.forEach((expense) => {
             stmt.run(expense.title, expense.amount, expense.date, expense.category, (err) => {
               if (err) {
                 console.error(`Failed to insert ${expense.title}:`, err.message);
               }
             });
           });
           stmt.finalize((err) => {
             if (err) {
               console.error('Failed to finalize sample data insertion:', err.message);
             } else {
               console.log('Sample data inserted successfully');
             }
           });
         } else {
           console.log('Table already contains data, skipping sample data insertion');
         }
       });
     });

     app.get('/', (req, res) => {
       res.send('Expense Tracker Backend is running. Use /api/expenses for API endpoints.');
     });

     app.get('/api/health', (req, res) => {
       db.get('SELECT 1', (err) => {
         if (err) {
           console.error('Health check failed:', err.message);
           return res.status(500).json({ status: 'error', message: 'Database connection failed' });
         }
         res.json({ status: 'ok', message: 'Backend and database are running' });
       });
     });

     app.get('/api/expenses', (req, res) => {
       db.all('SELECT * FROM expenses', [], (err, rows) => {
         if (err) {
           console.error('Error fetching expenses:', err.message);
           return res.status(500).json({ error: 'Failed to fetch expenses', details: err.message });
         }
         res.json(rows);
       });
     });

     app.post('/api/expenses', (req, res) => {
       const { title, amount, date, category } = req.body;
       if (!title || typeof title !== 'string' || title.trim().length === 0) {
         return res.status(400).json({ error: 'Title must be a non-empty string' });
       }
       if (!amount || isNaN(amount) || Number(amount) <= 0) {
         return res.status(400).json({ error: 'Amount must be a positive number' });
       }
       if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
         return res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
       }
       const validCategories = ['Food', 'Transport', 'Utilities', 'Entertainment'];
       if (!category || !validCategories.includes(category)) {
         return res.status(400).json({ error: `Category must be one of: ${validCategories.join(', ')}` });
       }

       db.run(
         'INSERT INTO expenses (title, amount, date, category) VALUES (?, ?, ?, ?)',
         [title.trim(), Number(amount), date, category],
         function (err) {
           if (err) {
             console.error('Error adding expense:', err.message);
             return res.status(500).json({ error: 'Failed to add expense', details: err.message });
           }
           res.status(201).json({ id: this.lastID, title, amount: Number(amount), date, category });
         }
       );
     });

     app.put('/api/expenses/:id', (req, res) => {
       const { id } = req.params;
       const { title, amount, date, category } = req.body;

       if (isNaN(id) || Number(id) <= 0) {
         return res.status(400).json({ error: 'ID must be a positive integer' });
       }
       if (!title || typeof title !== 'string' || title.trim().length === 0) {
         return res.status(400).json({ error: 'Title must be a non-empty string' });
       }
       if (!amount || isNaN(amount) || Number(amount) <= 0) {
         return res.status(400).json({ error: 'Amount must be a positive number' });
       }
       if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
         return res.status(400).json({ error: 'Date must be in YYYY-MM-DD format' });
       }
       const validCategories = ['Food', 'Transport', 'Utilities', 'Entertainment'];
       if (!category || !validCategories.includes(category)) {
         return res.status(400).json({ error: `Category must be one of: ${validCategories.join(', ')}` });
       }

       db.run(
         'UPDATE expenses SET title = ?, amount = ?, date = ?, category = ? WHERE id = ?',
         [title.trim(), Number(amount), date, category, id],
         function (err) {
           if (err) {
             console.error('Error updating expense:', err.message);
             return res.status(500).json({ error: 'Failed to update expense', details: err.message });
           }
           if (this.changes === 0) return res.status(404).json({ error: 'Expense not found' });
           res.json({ id: Number(id), title, amount: Number(amount), date, category });
         }
       );
     });

     app.delete('/api/expenses/:id', (req, res) => {
       const { id } = req.params;
       if (isNaN(id) || Number(id) <= 0) {
         return res.status(400).json({ error: 'ID must be a positive integer' });
       }

       db.run('DELETE FROM expenses WHERE id = ?', id, function (err) {
         if (err) {
           console.error('Error deleting expense:', err.message);
           return res.status(500).json({ error: 'Failed to delete expense', details: err.message });
         }
         if (this.changes === 0) return res.status(404).json({ error: 'Expense not found' });
         res.json({ message: 'Expense deleted successfully' });
       });
     });

     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

     process.on('SIGINT', () => {
       db.close((err) => {
         if (err) console.error('Error closing database:', err.message);
         console.log('Database connection closed');
         process.exit(0);
       });
     });