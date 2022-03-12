const Color = require("../models/DetailColor");

const addColor = async (req, res) => {
  const productId = req.params.id;
  const { color } = req.body;
  if (!color) {
    return res.status(403).json({ success: false, message: "Not found type" });
  }

  try {
    const newColor = new Color({
      productId,
      color,
    });

    await newColor.save();
    return res.json({
      success: true,
      message: "Add type successfully!",
      newColor,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const deleteColor = async (req, res) => {
  const deleteId = req.params.id;
  try {
    const color = await Color.findOneAndDelete({ _id: deleteId });
    if (!color) {
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

module.exports = { addColor, deleteColor };
