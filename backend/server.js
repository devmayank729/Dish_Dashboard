import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http"; // 1. Import Node's native HTTP
import { Server } from "socket.io"; // 2. Import Socket.io
import dishRoutes from "./dishRoutes.js";

dotenv.config();

const app = express();
// 3. Create an HTTP server wrapping the Express app
const httpServer = createServer(app); 

// 4. Initialize Socket.io and configure CORS for your Vite frontend
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PATCH"],
    credentials: true
  },
});

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "PATCH", "POST", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 5. Inject the 'io' instance into every request so your routes can use it
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/dishes", dishRoutes);

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB Connected");
} catch (err) {
  console.log("❌ Connection Error:", err.message);
}

// 6. Socket.io connection listener (for debugging)
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

// 7. IMPORTANT: Listen on httpServer, NOT the Express app!
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});