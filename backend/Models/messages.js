import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    readBy : {
        type : Array,
        required : true
    } ,
    sender : {
        type: String,
        required : true
    } ,
    content : {
        type : String,
        required : true
    } ,
    chat : {
        type : String,
        required : true
    } 
},{
    timestamps : true,
    strict : false
})

export const messages = new mongoose.model('message',messageSchema)