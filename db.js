const mongoose = require('mongoose');


const db = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('Connected to Database');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
