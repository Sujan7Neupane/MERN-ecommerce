import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log("MongoDB connection Successful!");
    console.log("\n DB_HOST:", connectionInstance.connection.host);
  } catch (error) {
    console.error("Error connecting to Database!", error);
    process.exit(1);
  }
};

export default dbConnect;
