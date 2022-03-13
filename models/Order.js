const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeString = require("../utils/String");
const typeNumber = require("../utils/Number");

const OrderSchema = new Schema({
  userId: typeString,
  sum: typeNumber,
  address: typeString,
  status: typeNumber,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  roleId: {
    type: Number,
    default: 2,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
