import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()


// mongodb ki api url ko .env file se le rahe hai

if (!process.env.MONGODB_URL) {
  throw new Error(
    "Please provide MONGODB_URI in the .env file"
  );
}

// database se connect karne ke liye function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Mongodb connected successfully")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB