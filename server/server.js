const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();
// Load env vars
dotenv.config();
//Database connection
connectDB();
//Setting Port
const PORT = process.env.PORT || 3030;
// Accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes 
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});