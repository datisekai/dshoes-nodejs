const Product = require("../models/Product");
const Type = require("../models/Type");
const Size = require("../models/DetailSize");
const Color = require("../models/DetailColor");
const DetailHandle = require("../models/DetailHandle");

const addProduct = async (req, res) => {
  const { name, image, prices, desc, type, size, color } = req.body;
  if (!name || !image || !prices || !desc || !type) {
    return res
      .status(403)
      .json({ success: false, message: "Please enter full field!" });
  }

  if ((size && size.length < 0) || (color && color.length < 0)) {
    return res.status(403).json({
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
    const deleteProduct = await Product.findByIdAndUpdate(
      { _id: productId },
      { status: 0 }
    );
    // await Size.deleteMany({ productId });
    // await Color.deleteMany({ productId });
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
  const { name, image, prices, desc, type, color, size, status } = req.body;
  if (!name || !image || !prices || !desc || !type || !color || !size) {
    return res
      .status(403)
      .json({ success: false, message: "Please enter full field!" });
  }

  console.log(status);

  try {
    let update = {
      name,
      image,
      prices,
      desc,
      typeId: type,
      status,
    };

    update = await Product.findOneAndUpdate({ _id: productId }, update, {
      new: true,
    });

    await Size.deleteMany({ productId });
    await Color.deleteMany({ productId });

    for (const index in size) {
      const newSize = new Size({
        productId: productId,
        size: size[index],
      });
      await newSize.save();
    }
    for (const index in color) {
      const newColor = new Color({
        productId: productId,
        color: color[index],
      });
      await newColor.save();
    }

    if (!update) {
      return res.status(401).json({ success: false, message: "Update failed" });
    }
    return res.json({
      success: true,
      message: "Update successfull",
      update,
      size,
      color,
    });
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
    const product = await Product.findOne({ _id: id }).populate("typeId");
    const sizeProduct = await Size.find({ productId: id });
    const size = sizeProduct.map((item) => item.size);
    const colorProduct = await Color.find({ productId: id });
    const color = colorProduct.map((item) => item.color);
    if (!product) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({
      success: true,
      message: "Get successfully",
      product,
      size,
      color,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getByTypeProduct = async (req, res) => {
  const typeId = req.params.id;
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  if (!typeId) {
    const allProduct = await Product.find({ status: 1 })
      .skip(skip)
      .limit(limit);
    const totalAll = await Product.countDocuments({ status: 1 });
    return res
      .status(403)
      .json({ success: true, products: allProduct, skip, total: totalAll });
  }
  try {
    const products = await Product.find({ typeId, status: 1 })
      .populate("typeId")
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({ typeId, status: 1 });
    if (!products) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({
      success: true,
      message: "Get successfully",
      products,
      typeId,
      skip,
      total,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getAllProduct = async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find({ status: 1 })
      .populate("typeId")
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({ status: 1 });
    if (!products) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({
      success: true,
      message: "Get successfully",
      products,
      skip,
      total,
      roleId: 1,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getAllProductByAdmin = async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find()
      .populate("typeId")
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments();
    if (!products) {
      return res.status(403).json({ success: false, message: "Get failed!" });
    }
    return res.json({
      success: true,
      message: "Get successfully",
      products,
      skip,
      total,
      roleId: 1,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const filterProducts = async (req, res) => {
  const { to, from, kind, text } = req.body;
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  let results, total;
  const searchPattern = new RegExp(text, "i");
  if (!to && !from && !kind && !text) {
    results = await Product.find({ status: 1 }).skip(skip).limit(limit);
    total = (await Product.find({ status: 1 })).length;
  }
  if (!to && !from && !kind && text) {
    results = await Product.find({ name: searchPattern, status: 1 })
      .skip(skip)
      .limit(limit);
    total = (await Product.find({ name: searchPattern, status: 1 })).length;
  }
  if (!to && !from && !text && kind) {
    results = await Product.find({ typeId: kind, status: 1 })
      .skip(skip)
      .limit(limit);
    total = (await Product.find({ typeId: kind, status: 1 })).length;
  }
  if (!to && !from && text && kind) {
    results = await Product.find({
      name: searchPattern,
      typeId: kind,
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        typeId: kind,
        status: 1,
      })
    ).length;
  }
  if (!text && !kind && !to && from) {
    results = await Product.find({ prices: { $lt: from }, status: 1 })
      .skip(skip)
      .limit(limit);
    total = (await Product.find({ prices: { $lt: from }, status: 1 })).length;
  }
  if (!text && !kind && to && from) {
    results = await Product.find({ prices: { $gte: to, $lt: from }, status: 1 })
      .skip(skip)
      .limit(limit);
    total = (await Product.find({ prices: { $gte: to, $lt: from }, status: 1 }))
      .length;
  }
  if (!text && !kind && !from && to) {
    results = await Product.find({ prices: { $gte: to }, status: 1 })
      .skip(skip)
      .limit(limit);
    total = (await Product.find({ prices: { $gte: to }, status: 1 })).length;
  }
  if (!text && kind && !to && from) {
    results = await Product.find({
      prices: { $lt: from },
      status: 1,
      typeId: kind,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({ prices: { $lt: from }, status: 1, typeId: kind })
    ).length;
  }
  if (!text && kind && to && from) {
    results = await Product.find({
      prices: { $gte: to, $lt: from },
      typeId: kind,
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        prices: { $gte: to, $lt: from },
        typeId: kind,
        status: 1,
      })
    ).length;
  }
  if (!text && kind && !from && to) {
    results = await Product.find({
      prices: { $gte: to },
      typeId: kind,
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({ prices: { $gte: to }, typeId: kind, status: 1 })
    ).length;
  }

  if (text && !kind && !to && from) {
    results = await Product.find({
      name: searchPattern,
      prices: { $lt: from },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        prices: { $lt: from },
        status: 1,
      })
    ).length;
  }
  if (text && !kind && to && !from) {
    results = await Product.find({
      name: searchPattern,
      prices: { $gte: to },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        prices: { $gte: to },
        status: 1,
      })
    ).length;
  }
  if (text && !kind && to && from) {
    results = await Product.find({
      name: searchPattern,
      prices: { $gte: to, $lt: from },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        prices: { $gte: to, $lt: from },
        status: 1,
      })
    ).length;
  }
  if (text && kind && !to && from) {
    results = await Product.find({
      name: searchPattern,
      typeId: kind,
      prices: { $lt: from },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        typeId: kind,
        prices: { $lt: from },
        status: 1,
      })
    ).length;
  }
  if (text && kind && to && !from) {
    results = await Product.find({
      name: searchPattern,
      typeId: kind,
      prices: { $gte: to },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        typeId: kind,
        prices: { $gte: to },
        status: 1,
      })
    ).length;
  }
  if (text && kind && to && from) {
    results = await Product.find({
      name: searchPattern,
      typeId: kind,
      prices: { $lt: from, $gte: to },
      status: 1,
    })
      .skip(skip)
      .limit(limit);
    total = (
      await Product.find({
        name: searchPattern,
        typeId: kind,
        prices: { $lt: from, $gte: to },
        status: 1,
      })
    ).length;
  }
  if (results) {
    return res.json({ success: true, results, skip, total });
  }
  return res.status(401).json({ success: false, results: [] });
};

const getMaxProduct = async (req, res) => {
  try {
    const products = await Product.find().sort("-prices");
    return res.json({ success: true, max: products[0].prices });
  } catch (err) {
    return res.status(401).json({ success: false, max: 0 });
  }
};

module.exports = {
  getAllProductByAdmin,
  addProduct,
  deleteProduct,
  updateProduct,
  getByIdProduct,
  getByTypeProduct,
  getAllProduct,
  filterProducts,
  getMaxProduct,
};
