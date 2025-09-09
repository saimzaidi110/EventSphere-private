// routes/notificationRoutes.js
const express = require("express");
const notificationController = require("../controllers/notificationController");
const router = express.Router();

// Get all notifications for a user
router.get("/:userId", notificationController.getUserNotifications);

// Mark a notification as read
router.put("/read", notificationController.markAsRead);

module.exports = router;
