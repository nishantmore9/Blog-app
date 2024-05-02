import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express(); 

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()

app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connected`))
  .catch((error) => console.log(error));


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(process.env.PORT || 8000 , () => {
  console.log(`Server started at PORT ${process.env.PORT}`);
})