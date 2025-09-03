const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connection Successful.");
  } catch (error) {
    console.error("MongoDB connection failed :", error);
    process.exit(1);
  }
}
module.exports = connectDB;
