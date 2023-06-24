const mongoose = require('mongoose');

const connectDB = async () => {
    let connStr = process.env.CONNECTION_STR.replace('<password>', process.env.DB_PASSWORD);

    try {
        const conn = await mongoose.connect(connStr, {
            // To avoid warnings in the console
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected Successfully at ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit();
    }
};

module.exports = connectDB;