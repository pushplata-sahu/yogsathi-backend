const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt"); // No need for bcrypt.hash here

// ✅ Test Route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "✅ Auth route working perfectly!" });
});

// Signup logic
router.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if the user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Save the new user (password will be hashed automatically by the pre-save hook)
    const newUser = new User({ name, email, phone, password }); // No need to hash the password here
    await newUser.save();

    return res.json({
      success: true,
      message: "Signup successful",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
