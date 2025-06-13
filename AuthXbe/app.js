require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/users"); //import user model
const JWT = require("jsonwebtoken"); //import jsonwebtoken for token generation
const bcrypt = require("bcryptjs");

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

app.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to register user" });
    });
});
