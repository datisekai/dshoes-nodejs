const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const jwt = require("jsonwebtoken");
const isLogin = require("../middleware/isLogin");
const isManagerUser = require("../middleware/isManagerUser");

const {
  registerUser,
  loginUser,
  getInfoUser,
  getAllUser,
  getRoleUser,
  deleteUser,
  addRoleUser,
  deleteRoleUser,
  updateUser,
  updateRoleUSer,
} = require("../Controller/UserController");
// /api/auth
router.get("/", (req, res) => res.send("Datisekai get auth successfull"));

// /api/auth/register
router.post("/register", registerUser);
// body require (email, password), not require (address, phoneNumber, name)
//return userId and token

// /api/auth/login
router.post("/login", loginUser);
// body require (email,password)
//return userId and token

// /api/auth/user
router.get("/user", isLogin, getInfoUser);
// header token

router.get("/user/:id", isLogin, getRoleUser);
//header token, id là id user cần get

router.put("/user/:id", isLogin, isManagerUser, updateUser);

// /api/auth/users

// isManagerUser là check roleId = 0
//header token and token getall phải có roleId là 0
// tk roleId 0 => bedatdz@gmail.com, bedatdz

router.get("/users", isManagerUser, getAllUser);

// /api/auth/user/:id
router.delete("/user/:id", isManagerUser, deleteUser);
// params userId delete, not body

// /api/auth/user/user/role/:id
router.post("/user/role/:id", isManagerUser, addRoleUser);

router.put("/user/role/:id", isManagerUser, updateRoleUSer);
// body: roleId cần add, nhớ check xem role mới này đã tồn tại trước đó hay chưa?;

router.delete("/user/role/:id", isManagerUser, deleteRoleUser);
// body: roleId

module.exports = router;

// Login
// Register
// Get user
// update user
