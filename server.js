const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Dynamic origin handling
const allowedOrigins = ["http://localhost:3000", "https://yogsathi.vercel.app"]; // add frontend deployed domain
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
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

// ✅ Use Railway port OR default 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
