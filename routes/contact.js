const express = require("express");
const router = express.Router();

// 🔧 yahan 'user.js' import kar rahe hain as Contact
const Contact = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const newEntry = new Contact({ name, phone, email, message });
    await newEntry.save();

    res.status(200).json({ success: true, message: "Contact saved!" });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
