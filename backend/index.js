require("dotenv").config();          // ✅ 1. Load .env trước

// ✅ 2. Log kiểm tra dotenv đã load biến gì
console.log("Loaded ENV keys:", Object.keys(process.env));
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");  // ✅ 3. import các lib sau đó
const mongoose = require("mongoose");

// ✅ 4. DÙNG env sau khi đã log
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

const app = express();
app.listen(3000, () => console.log("Server running"));