const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeString = require("../utils/String");
const typeNumber = require("../utils/Number");

const OrderSchema = new Schema(
  {
    userId: typeString,
    sum: typeNumber,
    address: typeString,
    status: typeNumber,
    name:typeString,
    roleId: {
      type: Number,
      default: 2,
    },
    phoneNumber:typeString
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
