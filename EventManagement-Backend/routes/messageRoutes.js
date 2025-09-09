const express = require("express");
const Message = require("../models/MessageSchema.js");

const router = express.Router();

// GET all messages between logged-in user and selected user
router.get("/:me/:other", async (req, res) => {
  try {
    const { me, other } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: me, receiverId: other },
        { senderId: other, receiverId: me },
      ],
    }).sort({ createdAt: 1 });

    res.json({ status: true, messages });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// POST send a message
// POST send a message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text, time } = req.body;
    if (!senderId || !receiverId || !text || !time) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const message = new Message({ senderId, receiverId, text, time });
    await message.save();

    // ✅ Emit to sender and receiver rooms
    const io = req.app.get("io");
    if (io) {
      io.to(`room:${senderId}`).emit("message:new", message);
      io.to(`room:${receiverId}`).emit("message:new", message);
    }

    res.json({ status: true, message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});


module.exports = router;
