const RoleCate = require("../models/Role_Cate");

const addRoleCate = async (req, res) => {
  const { roleId, category_name, route } = req.body;
  if (!roleId || !category_name || !route) {
    return res.status(400).json({ success: false, message: "Missing field" });
  }
  try {
    const newRoleCate = new RoleCate({
      roleId,
      category_name,
      route,
    });
    await newRoleCate.save();
    return res.json({ success: true, role_cate: newRoleCate });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const deleteRoleCate = async (req, res) => {
  const id = req.params.id;
  try {
    const roleCateDelete = await RoleCate.findOneAndDelete({ _id: id });
    if (roleCateDelete) {
      return res.json({ success: true, role: roleCateDelete });
    }
    return res.status(400).json({ success: false, message: "Not found id" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getRoleCate = async (req, res) => {
  try {
    const roleCate = await RoleCate.find();
    return res.json({ success: true, role_cate: roleCate });
  } catch (err) {
    return res.status(500).json({ success: true, message: "Internal server" });
  }
};

module.exports = {
  addRoleCate,
  deleteRoleCate,
  getRoleCate,
};
