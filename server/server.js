const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');

const app = express();
// Load env vars
dotenv.config();
//Database connection
connectDB();
//Setting Port
const PORT = process.env.PORT || 3030;

app.get('/api/v1/chat', (req, res) => {
    res.send('API is running...');
});

app.get('/api/v1/chat:id', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});