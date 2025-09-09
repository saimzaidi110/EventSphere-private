// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");

router.post("/", feedbackController.addFeedback);
router.get("/:eventId", feedbackController.getFeedback);

module.exports = router;
