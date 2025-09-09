const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, Email and Message are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      message,
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports= router;
