// models/MessageSchema.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  time: { type: String, required: true }, // store ISO string (e.g. new Date().toISOString())
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
