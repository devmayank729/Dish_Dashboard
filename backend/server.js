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


app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use("/api/dishes", dishRoutes);

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB Connected");


  const changeStream = Dish.watch([], { fullDocument: 'updateLookup' });

  changeStream.on('change', (change) => {
 
    if (change.operationType === 'update' || change.operationType === 'replace') {
      console.log("📡 Database change detected! Broadcasting to UI...");
      io.emit("dishUpdated", change.fullDocument);
    }
  });

} catch (err) {
  console.log("❌ Connection Error:", err.message);
}


io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;


httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});