const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS fix: allow frontend (localhost + Vercel)
const allowedOrigins = [
  "http://localhost:3000",
  "https://yogsathi.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/cURL etc.
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// 🛠 Manually set CORS headers (extra fix)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or specific origin for production
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb+srv://Pushplata:18062005@cluster0.hzufexw.mongodb.net/yogsathi?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/report"));
app.use("/api/predictor", require("./routes/predictor"));

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
