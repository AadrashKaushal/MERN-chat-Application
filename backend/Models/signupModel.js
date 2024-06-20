import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    } ,
    email : {
        type: String,
        required : true
    } ,
    password : {
        type : String,
        required : true
    } ,
    profilePicture : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

export const signupModel = new mongoose.model('signupModel',signupSchema)