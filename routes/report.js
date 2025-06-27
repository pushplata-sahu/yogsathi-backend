const express = require("express");
const router = express.Router();
const { getWeeklySummary } = require("../controllers/reportUtils");

router.get("/", (req, res) => {
  try {
    let summary = getWeeklySummary();

    // ✅ Add fallback if summary is null
    if (!summary) {
      summary = {
        totalMinutes: 0,
        avg: 0,
        streak: 0,
        last7: [],
        rewards: 0,
        challengeAttempted: false,
      };
    }

    res.json({ success: true, summary });
  } catch (err) {
    console.error("❌ Error generating summary:", err.message);
    res.status(500).json({ success: false, message: "Failed to load report summary." });
  }
});

module.exports = router;
