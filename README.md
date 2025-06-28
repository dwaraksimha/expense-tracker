# Insightful - A Personal Finance Tracker

link:https://expense-tracker-ytx8.vercel.app/


Insightful is a clean, modern, and responsive web application for tracking your personal income and expenses. It provides a clear overview of your financial health with an easy-to-use interface and visual data representations.

![Insightful App Screenshot](https://storage.googleapis.com/genai-assets/readme_insightful.png) 
*(Note: You can replace this placeholder image with a screenshot of your own running application.)*

---

## ✨ Features

- **Add Transactions:** Easily log new income or expense records.
- **Categorization:** Assign categories to each transaction (e.g., Food, Salary, Bills).
- **Financial Summary:** Get an at-a-glance view of your total income, total expenses, and current balance.
- **Spending Visualization:** A dynamic pie chart shows a breakdown of your expenses by category.
- **Transaction History:** View a sorted list of all your past transactions.
- **Data Persistence:** All your financial data is automatically saved in your browser's local storage, so it's there when you come back.
- **Delete Transactions:** Remove any transaction with a single click.
- **Responsive Design:** Fully usable on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/) (with Hooks), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Plain CSS with Custom Properties (Variables)
- **Deployment:** Ready for [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static site host.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or newer) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/YOUR_USERNAME/insightful-finance-tracker.git
    ```
    (Replace `YOUR_USERNAME` with your actual GitHub username)

2.  **Navigate to the project directory**
    ```sh
    cd insightful-finance-tracker
    ```

3.  **Install NPM packages**
    ```sh
    npm install
    ```

4.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application will be running on `http://localhost:5173` (the port may vary).

---

## 📦 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run preview`: Serves the production build locally to preview it.

---

## ☁️ Deployment

This project is configured to be easily deployed with [Vercel](https://vercel.com).

1.  Push your code to a GitHub repository.
2.  Sign up for a Vercel account and connect your GitHub.
3.  Import your project repository into Vercel.
4.  Vercel will automatically detect the Vite configuration and set the following settings:
    -   **Build Command:** `vite build`
    -   **Output Directory:** `dist`
5.  Click "Deploy" and your application will be live in minutes!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
