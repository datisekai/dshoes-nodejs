const Size = require("../models/DetailSize");

const addSize = async (req, res) => {
  const productId = req.params.id;
  const { size } = req.body;
  if (!size) {
    return res.status(403).json({ success: false, message: "Not found type" });
  }

  try {
    const newSize = new Size({
      productId,
      size,
    });

    await newSize.save();
    return res.json({
      success: true,
      message: "Add type successfully!",
      newSize,
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "Internal server" });
  }
};

const deleteSize = async (req, res) => {
  const deleteId = req.params.id;
  try {
    const size = await Size.findOneAndDelete({ _id: deleteId });
    if (!size) {
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

module.exports = { addSize, deleteSize };
