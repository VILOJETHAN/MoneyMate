const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let expenses = [];

// Route to get all expenses
app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

// Route to add a new expense
app.post('/api/expenses', (req, res) => {
    const { name, amount } = req.body;
    expenses.push({ name, amount, date: new Date() });
    res.json({ message: 'Expense added successfully' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
