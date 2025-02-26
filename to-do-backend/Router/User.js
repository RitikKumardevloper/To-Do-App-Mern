const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    return res.status(201).json({ message: "Sign-up successful" });
  } catch (error) {
    console.error("Error in user sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Log In Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res.status(400).json({ message: "Incorrect username or password" });
  }

  const match = await bcrypt.compare(password, existingUser.password);
  if (match) {
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "2d",
      }
    );

    res
      .status(200)
      .json({ id: existingUser._id, token, message: "login successful" });
  } else {
    return res.status(400).json({ message: "Incorrect username or password" });
  }
});

module.exports = router;
