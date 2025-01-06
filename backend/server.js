import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoute);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port: 3000");
});
