const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Manual CORS headers fix — important!
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 🟡 You can replace * with your frontend URL for security
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
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
