const express = require("express");
const {
  seedUsers,
  getUsers,
  postOneUser,
  patchUser,
  deleteUser,
  registerUser,
  loginUser,
} = require("../controllers/users");
const router = express.Router();

router.get("/seed", seedUsers);
router.get("/", getUsers);
router.post("/", postOneUser);
router.patch("/", patchUser);
router.delete("/", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
