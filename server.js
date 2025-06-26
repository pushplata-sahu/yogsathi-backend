const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: "*", // You can change to ["http://localhost:3000", "https://solo-sparks.vercel.app"] in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb+srv://Pushplata:18062005@cluster0.hzufexw.mongodb.net/yogsathi?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/report"));
app.use("/api/predictor", require("./routes/predictor"));

// ✅ Start the server
app.listen(5000, () => {
  console.log("🚀 Backend server running at http://localhost:5000");
});
