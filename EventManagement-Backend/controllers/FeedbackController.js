const Feedback = require("../models/Feedback");

exports.addFeedback = async (req, res) => {
  try {
    const { userId, eventId, username, message, rating } = req.body;

    if (!userId || !eventId || !username || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const feedback = new Feedback({
      userId,
      eventId,
      username,
      message,
      rating, // ✅ default rating
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};


exports.getFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const feedbacks = await Feedback.find({ eventId }).sort({ createdAt: -1 });

    res.json({ success: true, feedbacks });
  } catch (err) {
    console.error("Feedback Fetch Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}