import { response } from "express";
import { chats } from "../Models/chats.js";
export const groupAdminValidation = async(req,res,next) => {
    try {

        let {userId,id} = req.body;
        let chatInfo = await chats.find({_id : id});

        if(chatInfo[0].groupAdmin === userId) {
            await chats.deleteOne({_id : id});

            res.json({
                message : "Admin Leave so the group is deleted permanently",
                response : true
            })
        } else {
            next();
        }


    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        });
    }
}