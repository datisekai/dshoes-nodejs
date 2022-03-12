const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeNumber = require('../utils/Number')
const typeString = require('../utils/String')

const SizeSchema = new Schema({
   productId:typeString,
   size:typeNumber,
    createdAt:{
        type:Date,
        default:(new Date()).toISOString(),
    }
})

module.exports = mongoose.model('sizes',SizeSchema)