import { signupModel } from "../Models/signupModel.js";

export const emailExists = async(req,res,next) => {
    try {

        let {email} = req.body;

        let data = await signupModel.find({email : email});
        
        if(data.length > 0) {
            res.json({
                message : "Email already exists..",
                response : false
            })
        } else {
            next();
        }

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}