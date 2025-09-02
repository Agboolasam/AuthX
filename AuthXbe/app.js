import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import protectedRoute from "./routes/protectedRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const dbURL = process.env.MONGO_URI;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("listening");
    });
  })
  .catch((err) => console.log(err));

app.use("/auth", authRoutes); //use auth routes
app.use("/api", protectedRoute); //use protected route

/**To DO
 * Implement login functionality
 * Validate user credentials
 * Generate and return JWT token
 * encrypt data
 * set up docker container for db properly
 * Implement error handling
 * **/
