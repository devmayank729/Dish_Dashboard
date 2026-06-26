import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import dishRoutes from "./dishRoutes.js";
import Dish from "./models/Dish.js";

dotenv.config();

const app = express();
const httpServer = createServer(app); 

// 1. Initialize Socket.io and configure CORS
// Note: If deploying to Render, replace localhost with your live frontend URL!
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "PATCH"],
    credentials: true
  },
});

// 2. Express Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "PATCH", "POST", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 3. Inject the 'io' instance into requests (Optional, but good practice)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 4. API Routes
app.use("/api/dishes", dishRoutes);

// 5. MongoDB Connection & Change Streams
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB Connected");

  // Initialize MongoDB Change Stream right after connecting
  const changeStream = Dish.watch([], { fullDocument: 'updateLookup' });

  changeStream.on('change', (change) => {
    // Only broadcast if an existing document is updated or replaced
    if (change.operationType === 'update' || change.operationType === 'replace') {
      console.log("📡 Database change detected! Broadcasting to UI...");
      io.emit("dishUpdated", change.fullDocument);
    }
  });

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

// 7. Start the Server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});