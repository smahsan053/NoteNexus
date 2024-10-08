import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.error("Error connecting to Mongo:", error.message);
  }
};

export default connectToMongo;
