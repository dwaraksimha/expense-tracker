Expense Tracker

A full-stack expense tracker application built with a React frontend and a Node.js/Express backend, using SQLite for the database. Features include adding, editing, and deleting expenses, a category dropdown, and a pie chart to visualize expenses by category.

Created on: June 13, 2025

Project Structure

expense-tracker/
├── client/         # Frontend (React with Vite)
├── server/         # Backend (Node.js/Express with SQLite)
└── README.md

Prerequisites





Node.js: Version 16.14.0 or higher



npm: Version 8.x.x or higher



Git: For cloning the repository

Verify installations:

node -v
npm -v
git --version

Setup Instructions

1. Clone the Repository

git clone https://github.com/dwaraksimha/expense-tracker.git
cd expense-tracker

2. Set Up the Backend





Navigate to the backend folder:

cd server



Install dependencies:

npm install



Create a .env file in the server folder with the following content:

PORT=5000



Start the backend server:

npm start





The backend should run on http://localhost:5000.



Verify by visiting http://localhost:5000/api/health. Expected response:

{"status":"ok","message":"Backend and database are running"}



Check http://localhost:5000/api/expenses to see the sample data.

3. Set Up the Frontend





Open a new terminal and navigate to the frontend folder:

cd client



Install dependencies:

npm install



Start the frontend development server:

npm run dev





The frontend should run on http://localhost:5173.



Open http://localhost:5173 in your browser to view the application.

4. Test the Application





Expected Behavior:





The app displays 10 sample expenses.



You can add, edit, or delete expenses using the form.



The pie chart visualizes expenses by category (Food, Transport, Utilities, Entertainment).



Toast notifications appear for actions (add/edit/delete).



Loading states are shown during API calls.

Troubleshooting





Backend Issues:





If you see Failed to connect to SQLite database:

cd server
npm install sqlite3
rm database.db
npm start



Ensure port 5000 is free:

netstat -an | findstr 5000  # Windows
lsof -i :5000              # macOS/Linux



Frontend Issues:





If you see Failed to fetch expenses, check the browser console (F12 > Console) for errors.



Ensure the backend is running and the API URL (http://localhost:5000/api/expenses) is correct.



Verify port 5173 is free:

netstat -an | findstr 5173  # Windows
lsof -i :5173              # macOS/Linux

Features





Add, edit, and delete expenses with form validation.



Visualize expenses by category using a pie chart.



Toast notifications for user actions.



Loading states during API calls for better UX.



Responsive design with plain CSS.

Technologies Used





Frontend: React, Vite, Chart.js, React-Toastify, Axios



Backend: Node.js, Express, SQLite



Styling: Plain CSS

License

MIT License