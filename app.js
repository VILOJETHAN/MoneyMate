const express = require('express');
const fetch = require('node-fetch');  // Import node-fetch for making API requests

const app = express(); // Initialize Express

app.use(express.json()); // Middleware to parse JSON data

// API route for fetching real-time prices
app.get('/api/prices', async (req, res) => {
    const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your actual Alpha Vantage API key
    const symbol = req.query.symbol || 'AAPL'; // Default to Apple stock if no symbol provided
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    try {
        const response = await fetch(url); // Fetch data from Alpha Vantage API
        const data = await response.json(); // Convert the response to JSON
        res.json(data); // Send the data back as JSON
    } catch (error) {
        console.error('Error fetching data:', error); // Log error in case of a failure
        res.status(500).json({ message: 'Error fetching data' }); // Send an error response
    }
});

// Start the server on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
