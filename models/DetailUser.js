const mongoose = require('mongoose')
const Schema = mongoose.Schema
const typeString = require('../utils/String')
const typeNumber = require('../utils/Number')

const detailUserSchema = new Schema({
    userId:typeString,
    roleId:typeNumber
})

module.exports = mongoose.model('detailusers',detailUserSchema)