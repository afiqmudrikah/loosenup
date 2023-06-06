const express = require("express");
const { userPost, getUserPosts } = require("../controllers/posts");
const router = express.Router();

router.post("/send", userPost);
router.get("/:id", getUserPosts);

module.exports = router;
