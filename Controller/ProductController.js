const Product = require("../models/Product");
const Type = require("../models/Type");
const Size = require("../models/DetailSize");
const Color = require("../models/DetailColor");

const addProduct = async (req, res) => {
  const { name, image, prices, desc, type, size, color } = req.body;
  console.log(size, color);
  if (!name || !image || !prices || !desc || !type) {
    return res
      .status(403)
      .json({ success: false, message: "Please enter full field!" });
  }

  if ((size && size.length < 0) || (color && color.length < 0)) {
    return res
      .status(403)
      .json({
        success: false,
        message: "Please enter full field color or size",
      });
  }

  try {
    const isFoundType = await Type.findOne({ _id: type });
    if (!isFoundType) {
      return res
        .status(403)
        .json({ success: false, message: "type is not defined" });
    }
    console.log(1);

    const newProduct = new Product({
      name,
      image,
      prices,
      desc,
      status: 1,
      typeId: type,
    });
    await newProduct.save();
    for (const index in size) {
      const newSize = new Size({
        productId: newProduct._id,
        size: size[index],
      });
      await newSize.save();
    }
    for (const index in color) {
      const newColor = new Color({
        productId: newProduct._id,
        color: color[index],
      });
      await newColor.save();
    }
    return res
      .status(201)
      .json({ success: true, message: "add successfully", newProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(401).json({ success: false, message: "Not found id" });
  }
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: productId });
    await Size.deleteMany({productId})
    await Color.deleteMany({productId})
    if (!deleteProduct) {
      return res.status(401).json({ success: false, message: "Not found id" });
    }
    return res.json({ success: true, message: "Delete successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(401).json({ success: false, message: "Not found id" });
  }
  const { name, image, prices, desc, type } = req.body;
  if (!name || !image || !prices || !desc || !type) {
    return res
      .status(403)
      .json({ success: false, message: "Please enter full field!" });
  }
  try {
    let update = {
      name,
      image,
      prices,
      desc,
      type,
    };

    update = await Product.findOneAndUpdate({ _id: productId }, update, {
      new: true,
    });
    if (!update) {
      return res.status(401).json({ success: false, message: "Update failed" });
    }
    return res.json({ success: true, message: "Update successfull", update });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getByIdProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(403).json({ success: false, message: "Not found id" });
  }
  try {
    const product = await Product.findOne({ _id: id }).populate("type");
    const sizeProduct = await Size.find({productId:id});
    const size = sizeProduct.map(item => item.size);
    const colorProduct = await Color.find({productId:id});
    const color = colorProduct.map(item => item.color);
    if (!product) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({ success: true, message: "Get successfully", product,size,color });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getByTypeProduct = async (req, res) => {
  const typeId = req.params.id;
  const limit = req.query.limit || 5;
  const page = req.query.page || 1
  const skip = (page - 1) * limit;
  if (!typeId) {
    return res.status(403).json({ success: false, message: "Not found id" });
  }
  try {
    const products = await Product.find({ typeId }).populate("typeId").skip(skip).limit(limit);
    const total = await Product.countDocuments({typeId});
    if (!products) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({ success: true, message: "Get successfully", products, typeId,skip, total });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};


module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getByIdProduct,
  getByTypeProduct,
};
