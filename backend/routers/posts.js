const express = require("express");
const { userPost } = require("../controllers/posts");
const router = express.Router();

router.post("/send", userPost);

module.exports = router;
