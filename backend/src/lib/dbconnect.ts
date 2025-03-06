import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const db = (await mongoose.connect(process.env.MONGODB_URI as string))
    .connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to the database successfully!");
  });
  return db;
};
