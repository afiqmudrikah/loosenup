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

router.get("/", seedUsers);
router.get("/user", getUsers);
router.post("/user", postOneUser);
router.patch("/user", patchUser);
router.delete("/user", deleteUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;
