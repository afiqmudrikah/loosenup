const express = require("express");
const {
  seedUsers,
  getUsers,
  postOneUser,
  patchUser,
  deleteUser,
} = require("../controllers/users");
const router = express.Router();

router.get("/", seedUsers);
router.get("/user", getUsers);
router.post("/user", postOneUser);
router.patch("/user", patchUser);
router.delete("/user", deleteUser);

module.exports = router;
