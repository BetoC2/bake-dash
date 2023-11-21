import mongoose from "mongoose";
const mongoConnection =
  "mongodb+srv://admin:admin@myapp.mfg5ynr.mongodb.net/BakeDashDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnection, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};
