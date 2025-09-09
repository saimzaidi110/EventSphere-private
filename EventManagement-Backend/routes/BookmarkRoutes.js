const express = require("express");
const bookmarkController = require("../controllers/BookmarkController");

const router = express.Router();

// ✅ GET all bookmarks for user
router.get("/:userId", bookmarkController.getbookmarks);

// ✅ POST add/remove bookmark
router.post("/", bookmarkController.addBookmark);

module.exports = router;
