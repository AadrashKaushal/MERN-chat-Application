import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
    isGroupChat : {
        type : Boolean,
        required : true
    } ,
    users : {
        type: Array,
        required : true
    } ,
    chatname : {
        type : String,
        required : true
    } 
},{
    timestamps : true
})

export const chats = new mongoose.model('chat',chatsSchema)