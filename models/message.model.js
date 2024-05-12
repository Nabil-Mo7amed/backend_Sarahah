const mongoose=require('mongoose')


const schema= mongoose.Schema({
    message:String,
    userid:mongoose.SchemaTypes.ObjectId
})

const messageModel= mongoose.model('message',schema)

module.exports=messageModel