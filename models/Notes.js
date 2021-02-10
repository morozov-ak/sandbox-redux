const{Schema, model, Types}=require('mongoose')
const schema = new Schema({
    code:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    notetext:{type:String,required:true},
    date:{type:Date,default:Date.now},
    owner:{type:Types.ObjectId,ref:'User'},
    shared:[]
})
module.exports = model('Notes', schema)