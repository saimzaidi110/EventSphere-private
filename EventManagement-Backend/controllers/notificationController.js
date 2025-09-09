// controllers/notificationController.js

const UserSchema = require("../models/UserSchema");

const notificationController = {
    getUserNotifications: async (req, res) => {
        try {
            const { userId } = req.params;
            console.log(userId)

            const user = await UserSchema.findById(userId).select("notifications");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                notifications: user.notifications.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                ),
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
        }
    },

    markAsRead: async (req, res) => {
        try {
            const { userId, notificationId } = req.body;

            const user = await UserSchema.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const notification = user.notifications.id(notificationId);
            if (!notification) {
                return res.status(404).json({ message: "Notification not found" });
            }

            notification.isRead = true;
            await user.save();

            res.status(200).json({ message: "Notification marked as read", notification });
        } catch (error) {
            res.status(500).json({ message: "Failed to update notification", error: error.message });
        }
    },
};

module.exports = notificationController;
