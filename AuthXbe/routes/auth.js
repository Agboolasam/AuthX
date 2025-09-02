import express from "express";
import User from "../models/users.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
const client = new OAuth2Client(process.env.AUTH_ID);

router.post("/google-signin", async (req, res) => {
  try {
    const userToken = req.body.token;

    const ticket = await client.verifyIdToken({
      idToken: userToken,
      audience: process.env.AUTH_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        authId: googleId,
        authMethod: "google",
      });

      await user.save();
    } else if (user.authMethod === "local") {
      user.authId = googleId;
      user.authMethod = "hybrid";

      await user.save();
    }

    const accessToken = JWT.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = JWT.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("Google auth error", error);
    res.status(500).json({ error: "Issue encountered verifying your  user" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  if (!password) {
    return res.status(400).json({ error: "password canot be empty" });
  }
  if (!user) {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user with hashed password
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        authMethod: "local",
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = JWT.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = JWT.sign(
      { id: user._id },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to login user" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  try {
    const decoded = JWT.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = JWT.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

export default router;
