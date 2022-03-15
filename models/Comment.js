const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const typeString = require('../utils/String')


const CommentSchema = new Schema({
    productId:typeString,
    userId:typeString,
    content:typeString,
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    roleId:{
        type:Number,
        default:3
    }
})

module.exports = mongoose.model('comments',CommentSchema)