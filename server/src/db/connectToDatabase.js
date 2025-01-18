const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/project2';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectToDatabase;
