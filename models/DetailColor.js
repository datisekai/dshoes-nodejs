const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeNumber = require('../utils/Number')
const typeString = require('../utils/String')

const ColorSchema = new Schema({
   productId:typeString,
   color:typeString,
    createdAt:{
        type:Date,
        default:(new Date()).toISOString(),
    }
})

module.exports = mongoose.model('colors',ColorSchema)