
# Personal Finance Tracker

A personal finance tracker app built using React, Redux Toolkit, and various modern web technologies. The app helps users manage their income and expense transactions, providing an intuitive interface for viewing, adding, editing, and deleting transactions. It also offers data visualization and analytics, such as pie charts and average calculations, to help users better understand their financial situation.

## Features

### Transaction Management
- **Add Transaction**: Users can input transaction details (type, amount, category, notes) through a form.
- **Edit Transaction**: Users can edit existing transaction details and save changes.
- **Delete Transaction**: Users can remove unwanted transactions.
- **View Transaction Details**: Clicking on a transaction card opens a detailed view with more information.

### Transaction Filtering
- Users can filter transactions based on type (Income or Expense).

### Analytics
- **Pie Chart**: Displays the distribution of income vs expenses.
- **Average Calculation**: Shows the average spending for expenses and income for each type (e.g., income vs expenses).
  
### Charts
- A visual representation of financial data using a pie chart.
- Additional charts can be added to show trends over time using Chart.js or Recharts.

### UI/UX Design
- **Tailwind CSS**: For utility-first design, ensuring a clean, responsive layout.
- **Radix UI Components**: Accessible and customizable UI elements such as modals and switches.
- **Dark/Light Mode Toggle**: A switch to toggle between light and dark modes.

### Loading UI
- A loading animation is displayed during the 2-second delay when the page is reloaded for a smoother user experience.

### Data Persistence
- **Local Storage**: Transaction data is saved in local storage so that it persists across app reloads.

## Technologies

- **React**: For the user interface framework.
- **Redux Toolkit**: For managing the global state of transactions.
- **React Router**: For routing and navigation between different views (e.g., transaction details page).
- **TypeScript**: For static typing, improving maintainability and reducing runtime errors.
- **Tailwind CSS**: For utility-first CSS styling.
- **Radix UI**: For accessible and customizable components (e.g., modals, switches).
- **Chart.js / Recharts**: For displaying financial data visualizations.
- **LocalStorage API**: For persisting transaction data across sessions.


