import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
