const express = require("express");
const router = express.Router();
const {
  getWeeklySummary
} = require("../controllers/reportUtils");

router.get("/", (req, res) => {
  const summary = getWeeklySummary();
  res.json({ success: true, summary });
});

module.exports = router;
