const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeString = require("../utils/String");
const typeNumber = require("../utils/Number");

const ProductSchema = new Schema(
  {
    name: typeString,
    image: [String],
    prices: typeNumber,
    desc: { type: String },
    status: typeNumber,
    roleId: { type: Number, default: 1 },
    typeId: { type: Schema.Types.ObjectId, ref: "types" },
  },
  {
    timestamps: true,
  }
);
ProductSchema.index({name:'text'})
const Products = mongoose.model("products", ProductSchema)
Products.createIndexes()

module.exports = Products;
