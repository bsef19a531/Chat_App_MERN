const mongoose = require('mongoose');

const connectDB = async () => {
    let connStr = process.env.CONNECTION_STR.replace('<password>', process.env.DB_PASSWORD);
    let dbName = process.env.DB_NAME;
    connStr = connStr.replace('<dbname>', dbName);
    // console.log(connStr);

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