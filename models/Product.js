const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeString = require("../utils/String");
const typeNumber = require("../utils/Number");

const ProductSchema = new Schema({
  name: typeString,
  image: [String],
  prices: typeNumber,
  desc: { type: String },
  status: typeNumber,
  roleId: { type: Number, default: 1 },
  type: { type: Schema.Types.ObjectId, ref: "types" },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("products", ProductSchema);
