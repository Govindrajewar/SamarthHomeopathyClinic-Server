const mongoose = require("mongoose");

// connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected...`);
  } catch (error) {
    console.error("MongoDB Server Issue:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
