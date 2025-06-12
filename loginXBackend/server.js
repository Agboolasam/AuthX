const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express(); //initialize express server

app.use(cors()); //use cors
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userdata",
}); //create database connection
app.post("/register", (req, res) => {
  const sql = "INSERT INTO signup (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error Occured");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});
app.listen(8081, () => {
  console.log("listening");
}); //expose the server over a port
