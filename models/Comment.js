const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const typeString = require('../utils/String')


const CommentSchema = new Schema({
    productId:typeString,
    userId:{type:Schema.Types.ObjectId, ref:'users'},
    content:typeString,
    roleId:{
        type:Number,
        default:3
    }
}, {
    timestamps:true
}
)

module.exports = mongoose.model('comments',CommentSchema)