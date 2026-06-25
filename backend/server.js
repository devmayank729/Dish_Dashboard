import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dishRoutes from "./dishRoutes.js";


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();



// Middleware
// app.use(cors());
// app.use(express.json());


// Middleware
app.use(cors({
  origin: "http://localhost:5173", // This must exactly match your Vite URL
  methods: ["GET", "PATCH", "POST", "DELETE"],
  credentials: true
}));


// any request with api sent to routees 
app.use("/api/dishes", dishRoutes);


app.use(express.json());


// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
} 
catch (err) {
  console.log("Connection Error:", err.message);
}

// Test Route
app.get("/", (req, res) => {
  res.send("🍽️ Dish API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});