const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const typeString = require("../utils/String");

const TypeSchema = new Schema({
  type: typeString,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  display: { type: Boolean, default: true },
});

module.exports = mongoose.model("types", TypeSchema);
