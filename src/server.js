import mongoose from "mongoose";
import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "ReadMore API is healthy" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => console.log("Server running on port: ", 3000));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1)
  });

