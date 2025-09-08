import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", authRouter);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
