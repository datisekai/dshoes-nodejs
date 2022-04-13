const { response } = require("express");
const DetailOrder = require("../models/DetailOrder");
const Order = require("../models/Order");

const addOrder = async (req, res) => {
  const { userId, sum, address, phoneNumber, name, products } = req.body;
  if (!userId || !sum || !address || !phoneNumber || !name || !products) {
    return res
      .status(401)
      .json({ success: false, message: "Please enter full field !" });
  }
  try {
    const newOrder = new Order({
      userId,
      sum,
      address,
      phoneNumber,
      name,
      status: 1,
    });

    await newOrder.save();

    for (const index in products) {
      const newDetail = new DetailOrder({
        orderId: newOrder._id,
        productId: products[index].productId,
        size: products[index].size,
        color: products[index].color,
        quantify: products[index].quantify,
      });
      await newDetail.save();
    }
    return res.json({
      success: true,
      message: "Add successfull",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const addOrderFromCustomer = async (req, res) => {
  const { sum, address, phoneNumber, name, products } = req.body;
  const userId = req.userId;
  if (!userId || !sum || !address || !phoneNumber || !name || !products) {
    return res
      .status(401)
      .json({ success: false, message: "Please enter full field !" });
  }
  try {
    const newOrder = new Order({
      userId,
      sum,
      address,
      phoneNumber,
      name,
      status: 1,
    });

    await newOrder.save();

    for (const index in products) {
      const newDetail = new DetailOrder({
        orderId: newOrder._id,
        productId: products[index].productId,
        size: products[index].size,
        color: products[index].color,
        quantify: products[index].quantify,
      });
      await newDetail.save();
    }
    return res.json({
      success: true,
      message: "Add successfull",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const isFoundID = await Order.findOne({ _id: id });
    if (!isFoundID) {
      return res.status(401).json({ success: false, message: "Not found id" });
    }
    const deleteOd = await Order.findOneAndDelete({ _id: id });
    await DetailOrder.deleteMany({ orderId: id });
    if (!deleteOd) {
      return res.status(401).json({ success: false, message: "Delete failed" });
    }
    return res.json({ success: true, message: "Delete successfull", deleteOd });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { userId, sum, address, phoneNumber, name, status } = req.body;
  if (!userId || !sum || !address || !phoneNumber || !name) {
    return res
      .status(401)
      .json({ success: false, message: "Please enter full field !" });
  }
  try {
    let updateOrder = {
      userId,
      sum,
      address,
      phoneNumber,
      name,
      status,
    };
    updateOrder = await Order.findOneAndUpdate({ _id: id }, updateOrder, {
      new: true,
    });
    if (!updateOrder) {
      return res.status(400).json({ success: false, message: "Update failed" });
    }
    return res.json({
      success: true,
      message: "Update successfully",
      updateOrder,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(400).json({ success: false, message: "not found id" });
    }
    return res.json({ success: true, order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getDetailById = async (req, res) => {
  const id = req.params.id;
  try {
    const detail = await DetailOrder.find({ orderId: id }).populate(
      "productId"
    );
    if (!detail) {
      return res.status(400).json({ success: false, message: "not found id" });
    }
    return res.json({ success: true, detail });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getAllOrderByToken = async (req, res) => {
  const userId = req.userId;
  try {
    const orderToken = await Order.find({ userId });
    if (!orderToken) {
      return res.status(400).json({ success: false, message: "not found id" });
    }

    return res.json({ success: true, orderToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

const getAllOrderByAdmin = async (req, res) => {
  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit; 
  try {
    const orders = await Order.find().limit(limit).skip(skip);
    const total = await Order.countDocuments()
    return res.json({ success: true, orders,limit, page, skip,total,roleId:2 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderById,
  getDetailById,
  getAllOrderByAdmin,
  getAllOrderByToken,
  addOrderFromCustomer,
};
