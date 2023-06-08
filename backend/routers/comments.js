const express = require("express");
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const router = express.Router();

router.post("/send", createComment);
router.get("/:id", getAllComments);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
