const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Role_CateSchema = new Schema({
    roleId:{type:Number, required:true},
    category_name:{type:String, required:true},
    route:{type:String, required:true}
}, {
    timestamps:true
}
)

module.exports = mongoose.model('role_cate',Role_CateSchema)