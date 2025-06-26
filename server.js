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
    if (!origin) return callback(null, true); // allow Postman/cURL
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// ✅ MongoDB
mongoose.connect("your-mongodb-url")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/report"));
app.use("/api/predictor", require("./routes/predictor"));

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
