import express from "express";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.user });
});

export default router;
