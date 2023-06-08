const express = require("express");
const {
  userPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/posts");
const router = express.Router();

router.post("/send", userPost);
router.get("/:id", getUserPosts);
router.get("/", getAllPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
