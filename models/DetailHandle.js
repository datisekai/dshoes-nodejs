const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailHandle = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "orders" },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("detailHandle", DetailHandle);
