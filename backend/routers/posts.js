const express = require("express");
const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/posts");
const router = express.Router();

router.post("/send", createPost);
router.get("/:id", getUserPosts);
router.get("/", getAllPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
