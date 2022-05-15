const Type = require("../models/Type");
const mongoose = require("mongoose");

const addType = async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(403).json({ success: false, message: "Not found type" });
  }

  try {
    const isFound = await Type.findOne({ type: type.toLowerCase() });
    if (!isFound) {
      const newType = new Type({
        type: type.toLowerCase(),
      });

      await newType.save();
      return res.json({
        success: true,
        message: "Add type successfully!",
        newType,
      });
    } else {
      const newType = await Type.findOneAndUpdate(
        { type: type.toLowerCase() },
        { display: true }
      );
      return res.json({
        success: true,
        message: "Add type successfully!",
        newType,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const deleteType = async (req, res) => {
  const typeId = req.params.id;
  try {
    const type = await Type.findOneAndUpdate(
      { _id: typeId },
      { display: false }
    );
    if (!type) {
      return res
        .status(401)
        .json({ success: true, message: "Not found type!" });
    }
    return res.json({ success: true, message: "delete successfully!" });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const getAllType = async (req, res) => {
  try {
    const types = await Type.find();
    return res.json({ success: true, types });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

module.exports = { addType, deleteType, getAllType };
