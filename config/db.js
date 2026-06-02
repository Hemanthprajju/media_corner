const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbName = process.env.DB_NAME || 'MediaCorner';
        await mongoose.connect(process.env.MONGO_URI, {
            dbName,
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`Connected to MongoDB Atlas (${mongoose.connection.name})`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
