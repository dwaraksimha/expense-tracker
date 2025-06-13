💸 Expense Tracker











A full-stack expense tracker application built with a React frontend and a Node.js/Express backend, using SQLite for the database. Track your expenses, categorize them, and visualize spending patterns with an interactive pie chart. 🚀

Created on: June 13, 2025
Author: Dwarak Simha
Repository: github.com/dwaraksimha/expense-tracker

📋 Overview

This project helps you manage your expenses efficiently. Add, edit, or delete expenses, categorize them into Food, Transport, Utilities, or Entertainment, and see a breakdown of your spending with a dynamic pie chart. The app features toast notifications, loading states, and form validation for a seamless user experience.

✨ Features





Add, edit, and delete expenses with real-time updates.



Categorize expenses into Food, Transport, Utilities, and Entertainment.



Visualize spending by category with an interactive pie chart.



Toast notifications for user actions (add/edit/delete).



Loading states during API calls for better UX.



Responsive design with clean, minimal CSS.

🛠️ Technologies Used





Frontend: React, Vite, Chart.js, React-Toastify, Axios



Backend: Node.js, Express, SQLite



Styling: Plain CSS

📂 Project Structure

expense-tracker/
├── client/         # Frontend (React with Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/         # Backend (Node.js/Express with SQLite)
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md

🚀 Getting Started

Follow these steps to set up and run the project locally.

1. Prerequisites

Ensure you have the following installed:





Node.js: Version 16.14.0 or higher



npm: Version 8.x.x or higher



Git: For cloning the repository

Verify installations:

node -v
npm -v
git --version

2. Clone the Repository

git clone https://github.com/dwaraksimha/expense-tracker.git
cd expense-tracker

3. Set Up the Backend





Navigate to the backend folder:

cd server



Install dependencies:

npm install



Create a .env file in the server folder with the following content:

PORT=5000



Start the backend server:

npm start





The backend will run on http://localhost:5000.



Verify by visiting http://localhost:5000/api/health. Expected response:

{"status":"ok","message":"Backend and database are running"}



Check http://localhost:5000/api/expenses to see sample data.

4. Set Up the Frontend





Open a new terminal and navigate to the frontend folder:

cd client



Install dependencies:

npm install



Start the frontend development server:

npm run dev





The frontend will run on http://localhost:5173.



Open http://localhost:5173 in your browser to view the app.

5. Test the Application





The app should display 10 sample expenses.



Add, edit, or delete expenses using the form.



Check the pie chart for a visual breakdown of expenses by category.



Look for toast notifications and loading states during actions.

🐞 Troubleshooting





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

📸 Screenshots

Coming soon! Add a screenshot of the app in action.

🤝 Contributing

Contributions are welcome! To contribute:





Fork the repository.



Create a new branch (git checkout -b feature/your-feature).



Make your changes and commit (git commit -m "Add your feature").



Push to your branch (git push origin feature/your-feature).



Create a pull request.

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact

For questions or feedback, reach out to Dwarak Simha.

Happy tracking! 💡
