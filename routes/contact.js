const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // ✅ Ensure this path is correct

// 🔹 POST /api/contact
router.post("/", async (req, res) => {
  const { name, phone, email, message } = req.body;

  // 🔸 Validate all fields
  if (!name || !phone || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newContact = new Contact({ name, phone, email, message });
    await newContact.save();

    res.status(200).json({
      success: true,
      message: "✅ Contact submitted successfully!",
    });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
});

module.exports = router;
