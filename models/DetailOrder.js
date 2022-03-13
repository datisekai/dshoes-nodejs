const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeNumber = require("../utils/Number");
const typeString = require("../utils/String");

const DetailOrderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "products" },
  orderId: { type: Schema.Types.ObjectId, ref: "orders" },
  size: {type:Number},
  color: {type:String},
  quantify: {type:Number, default:0},
});

module.exports = mongoose.model("detailOrder", DetailOrderSchema);
