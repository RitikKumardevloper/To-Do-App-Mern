const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const app = express();

// Use built-in middleware for JSON parsing
app.use(express.json());
app.use(cors());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
