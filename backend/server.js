import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dishRoutes from "./dishRoutes.js";



dotenv.config();

const app = express();





app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "PATCH", "POST", "DELETE"],
  credentials: true
}));



app.use("/api/dishes", dishRoutes);


app.use(express.json());


try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
} 
catch (err) {
  console.log("Connection Error:", err.message);
}


app.get("/", (req, res) => {
  res.send("Dish API is running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});