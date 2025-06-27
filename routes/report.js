const express = require("express");
const router = express.Router();
const { getWeeklySummary } = require("../controllers/reportUtils");

router.get("/", (req, res) => {
  try {
    const summary = getWeeklySummary(); // ✅ sync is okay here
    res.json({ success: true, summary });
  } catch (err) {
    console.error("❌ Error generating summary:", err.message);
    res.status(500).json({ success: false, message: "Failed to load report summary." });
  }
});

module.exports = router;
