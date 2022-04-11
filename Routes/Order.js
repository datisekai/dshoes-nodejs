const express = require("express");
const argon2 = require("argon2");
const router = express.Router();
const isLogin = require("../middleware/isLogin");
const isManagerComments = require("../middleware/isManagerComment");
const isExist = require("../middleware/isExist");
const isManagerOrder = require("../middleware/isManagerOrder");
const isCustomer = require("../middleware/isCustomer");
const {
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderById,
  getDetailById,
  getAllOrderByToken,
  getAllOrderByAdmin,
  addOrderFromCustomer,
} = require("../Controller/OrderController");

// add order
// /api/orders/
router.post("/", isLogin, isExist, isManagerOrder, addOrder);
router.post("/customers", isLogin, isExist, isCustomer, addOrderFromCustomer);

//delete order
// /api/orders/:id
router.delete("/:id", isLogin, isExist, isManagerOrder, deleteOrder);

// update order
// /api/orders/:id
router.put("/:id", isLogin, isExist, isManagerOrder, updateOrder);

//get by id
// /api/orders/:id
router.get("/:id", isLogin, getOrderById);

//get detail by id
router.get("/detail/:id", isLogin, getDetailById);

// get all order by token
router.get("/", isLogin, getAllOrderByToken);

//get al order by admin
router.get("/admin/all", isLogin, isExist, isManagerOrder, getAllOrderByAdmin);

module.exports = router;
