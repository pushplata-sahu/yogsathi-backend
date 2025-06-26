const express = require("express");
const router = express.Router();
const { predictYogaTomorrow } = require("../utils/ml");

router.post("/", (req, res) => {
  const { minutes } = req.body;

  if (minutes == null) {
    return res.status(400).json({ success: false, message: "Minutes required" });
  }

  const prediction = predictYogaTomorrow(minutes);
  res.json({ success: true, prediction });
});

module.exports = router;
