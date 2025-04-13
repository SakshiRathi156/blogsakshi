//const variables can't be reassigned
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGO_URI ? 'URI is set' : 'URI is not set');
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB database successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}
module.exports = connectDB;