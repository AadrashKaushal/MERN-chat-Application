import { chats } from "../Models/chats.js";
export const  chatExists = async(req,res,next) => {
    try {

        let {user} = req.body;

        let isExists = await chats.find({users : user});

        if(isExists.length == 0) {
            next();
        } else {
            res.json({
                message : "Chat Already exists",
                response : false
            })
        }
    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}