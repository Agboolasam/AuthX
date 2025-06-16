const express = require("express");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
