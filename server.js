const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS fix — allow all for now (you can restrict later)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 🔥 Use "*" for testing. Replace with frontend URL later
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ✅ MongoDB
mongoose.connect("your-mongodb-url")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/report"));
app.use("/api/predictor", require("./routes/predictor"));

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
