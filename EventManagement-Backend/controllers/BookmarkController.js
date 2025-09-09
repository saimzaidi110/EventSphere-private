const BookmarkSchema = require("../models/BookmarkSchema");

const bookmarkController = {
  // ✅ GET user bookmarks
  getbookmarks: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId)
      const bookmarks = await BookmarkSchema.find({ userId }).populate("eventId");
      res.json(bookmarks);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ✅ POST add/remove bookmark
  addBookmark: async (req, res) => {
    try {
      const { userId, eventId } = req.body;
      if (!userId || !eventId) {
        return res.status(400).json({ message: "userId and eventId are required" });
      }

      // check if already bookmarked
      const existing = await BookmarkSchema.findOne({ userId, eventId });
      if (existing) {
        await BookmarkSchema.deleteOne({ _id: existing._id });
        return res.json({ status: true, message: "Bookmark removed" });
      }

      const bookmark = new BookmarkSchema({ userId, eventId });
      await bookmark.save();
      res.json({ status: true, message: "Bookmarked successfully", bookmark });
    } catch (err) {
      console.error("Error saving bookmark:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = bookmarkController;
