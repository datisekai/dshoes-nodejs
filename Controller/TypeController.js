const Type = require("../models/Type");
const mongoose = require('mongoose')

const addType = async (req, res) => {
  const { type } = req.body;
  console.log(type);
  if (!type) {
    return res.status(403).json({ success: false, message: "Not found type" });
  }

  try {
   

    const newType = new Type({
      type: type.toLowerCase(),
    });

    await newType.save();
    return res.json({ success: true, message: "Add type successfully!",newType });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const deleteType = async (req, res) => {
  const typeId = req.params.id;
  try {
    const type = await Type.findOneAndDelete({ _id: typeId });
    console.log(type);
    if (!type) {
      return res
        .status(401)
        .json({ success: true, message: "Not found type!" });
    }
    return res
      .status(400)
      .json({ success: true, message: "delete successfully!" });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const getAllType = async(req, res) => {
  try{
    const types = await Type.find();
    console.log(types);
    return res.json({success:true, types})
  }catch(err)
  {
    return res.status(403).json({ success: false, message: "Internal server" });
  }
}

module.exports = { addType, deleteType,getAllType };
