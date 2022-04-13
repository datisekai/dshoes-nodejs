const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Users = require("../models/Users");
const DetailUser = require("../models/DetailUser");
const { findOneAndUpdate } = require("../models/Users");

const registerUser = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  if (!email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }
  try {
    const isEmail = await Users.findOne({ email });
    if (isEmail) {
      return res
        .status(500)
        .json({ success: false, message: "Username already" });
    }

    //good
    const hashPassword = await argon2.hash(password);
    const newUser = new Users({
      email,
      password: hashPassword,
      phoneNumber,
    });
    await newUser.save();

    const newDetail = new DetailUser({
      userId: newUser._id,
      roleId: 2,
    });

    await newDetail.save();

    const newDetail1 = new DetailUser({
      userId: newUser._id,
      roleId: 3,
    });

    await newDetail1.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      "datisekai"
    );
    return res.json({
      success: true,
      message: "Register successfull",
      token,
      userId: newUser._id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or password" });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      "datisekai"
    );
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getInfoUser = async (req, res) => {
  const userID = req.userId;
  if (!userID)
    return res.send(400).json({
      success: false,
      message: "Incorrect token",
    });
  const user = await Users.findOne({ _id: userID }).select("-password");
  const rolesUser = await DetailUser.find({ userId: userID });
  const onlyRoles = rolesUser.map((item) => item.roleId);

  if (!user) {
    return res.send(400).json({
      success: false,
      message: "Incorrect userId",
    });
  }
  return res.status(200).json({
    success: true,
    user,
    rolesUser: onlyRoles,
  });
};

const getAllUser = async (req, res) => {
  const userId = req.userId;
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  if (!userId)
    return res.send(400).json({
      success: false,
      message: "Incorrect token",
    });
  const users = await Users.find().skip(skip).limit(limit);
  const totalAll = await Users.countDocuments();
  return res.status(200).json({
    success: true,
    users,
    total: totalAll,
    skip,
    page,
    roleId:0
  });
};

const getRoleUser = async (req, res) => {
  const userId = req.userId;
  if (!userId)
    return res.send(400).json({
      success: false,
      message: "Incorrect token",
    });
  const id = req.params.id;
  const roleUser = await DetailUser.find({ userId: id });
  return res.status(200).json({
    success: true,
    roleUser,
  });
};

const deleteUser = async (req, res) => {
  const userId = req.userId;
  if (!userId)
    return res.send(400).json({
      success: false,
      message: "Incorrect token",
    });
  const id = req.params.id;
  if (!id) {
    return res.send(400).json({
      success: false,
      message: "Must be userId",
    });
  }

  //good
  try {
    const deleteCondition = { _id: id };
    const deleteUser = await Users.findOneAndDelete(deleteCondition);
    const deleteDetail = await DetailUser.deleteMany({ userId: id });
    if (!deleteUser && !deleteDetail) {
      return res.send(400).json({
        success: false,
        message: "Delete failed",
      });
    }
    return res.json({
      success: true,
      message: "Delete successfully",
    });
  } catch (err) {
    return res.send(400).json({
      success: false,
      message: "Delete failed catch",
    });
  }
};

const addRoleUser = async (req, res) => {
  const userId = req.userId;
  if (!userId)
    return res.send(400).json({
      success: false,
      message: "Incorrect token",
    });
  const id = req.params.id;
  const { roleId } = req.body;
  try {
    const newRole = new DetailUser({
      userId: id,
      roleId,
    });
    await newRole.save();
    return res.json({ success: true, message: "Add successfully" });
  } catch (err) {
    return res.send(400).json({
      success: false,
      message: "add failed catch",
    });
  }
};

const deleteRoleUser = async (req, res) => {
  const userId = req.userId;
  if (!userId)
    return res.status(403).json({
      success: false,
      message: "Incorrect token",
    });
  const id = req.params.id;
  const { roleId } = req.body;
  try {
    const deleteUser = await DetailUser.findOneAndDelete({
      userId: id,
      roleId: roleId,
    });
    if (!deleteUser) {
      return res.status(403).json({
        success: false,
        message: "Delete failed",
      });
    }
    return res.json({ success: true, message: "Delete successfully" });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Delete failed catch",
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, phoneNumber, password } = req.body;
  const hashPassword = await argon2.hash(password);
  try {
    const isFound = await Users.findById({ _id: id });
    if (isFound) {
      const newUser = await Users.findOneAndUpdate(
        { _id: id },
        {
          email,
          phoneNumber,
          password:hashPassword,
        },
        { new: true }
      );
      return res.json({ success: true, user: newUser });
    }
    return res.status(404).json({ success: false, message: "Error ID" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getInfoUser,
  getAllUser,
  getRoleUser,
  deleteUser,
  addRoleUser,
  deleteRoleUser,
  updateUser,
};
