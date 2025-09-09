// index.js
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const http = require("http");             // ✅ add
const { Server } = require("socket.io");  // ✅ add
const ConnectDB = require("./config/db.js");

require('dotenv').config();


const UserRouter = require("./routes/UserRoutes");
const EventRouter = require("./routes/EventRoutes.js");
const bookmarkRoutes = require("./routes/BookmarkRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const chatbotRoutes = require("./routes/chatbotRoutes.js")
const feedbackRoutes = require("./routes/FeedbackRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const contactRoutes = require( "./routes/contactRoutes.js");
const app = express();
ConnectDB();

// Enable CORS with credentials for frontend
app.use(cors({
  origin: "http://localhost:5173",  // Update if frontend runs elsewhere
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/uploads", express.static("uploads")); // ✅ expose uploads folder
app.use("/users", UserRouter);
app.use("/api/expos", EventRouter);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/messages", messageRoutes);
app.use('/api/chatbot', chatbotRoutes)
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);

// Home test
app.get('/', (req, res) => {
  res.send("Server is Running");
});

const port = 3000;
const server = http.createServer(app);

// --- SOCKET.IO setup ---
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// Store io instance in app so routes can use it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Client will join their own room
  socket.on("join", (userId) => {
    if (userId) {
      socket.join(`room:${userId}`);
      console.log(`User ${userId} joined room:${userId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
