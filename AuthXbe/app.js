require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); //import auth routes
const protectedRoute = require("./routes/protectedRoute"); //import protected route
const app = express(); //initialize express server
app.use(cors()); //use cors
app.use(express.json());

const dbURL = process.env.DB_URL; //get database URL from .env file

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
