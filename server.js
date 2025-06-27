const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables

const app = express();

// ✅ CORS setup (FINAL)
const corsOptions = {
  origin: [
    'https://yogsathi-oghv.vercel.app',     // ✅ YogSathi live frontend
    'https://solo-sparks-omega.vercel.app', // ✅ Solo Sparks frontend
    'http://localhost:3000',                // ✅ Local dev (optional)
    'http://localhost:3001'                 // ✅ Alternate local port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // ✅ Apply CORS
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/report"));
app.use("/api/predictor", require("./routes/predictor"));
app.use("/api/contact", require("./routes/contact")); // ✅ ✅ ✅ ADD THIS LINE

// ✅ Test Route (to verify live status)
app.get("/", (req, res) => {
  res.send("✅ YogSathi Backend Live!");
});

// ✅ Start Server (dynamic PORT for Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
