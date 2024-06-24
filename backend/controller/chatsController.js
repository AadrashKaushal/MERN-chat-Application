import { signupModel } from "../Models/signupModel.js";

export const getUserProfileController = async(req,res) => {
    try {
       let {payloadData} = req.userData;
       let {email} = payloadData;

        let userProfile = await signupModel.find({email : email});
        
        res.json({
            response : true,
            message : "Get user Profile Successfully",
            data : userProfile[0]
        })

    } catch(err) {
        res.json({
            response : false,
            message : "Something went wrong !!"
        });
    }
}