import { signupModel } from "../Models/signupModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../helper/generateToken.js";

export  const signupController = (req,res) => {
    try {

        let {username,email,password} = req.body;
        let profilePicture = req.file.path;
        
        console.log(email)
        // encrypt the password

        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {

            if(err) console.log(err);
            bcrypt.hash(password, salt, async function(err, hash) {

                if(err) console.log(err);
                let userData = new signupModel({fullname : username , email : email , password : hash , profilePicture : profilePicture})
                await userData.save();

            });
        });

        let token = generateToken({email : email,username : username});
    
        res.json({
            response : true,
            token : token,
            message : "Account created successfully"
        })

    } catch(err) {
        console.log(err);
        
        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}

export const loginController = (req,res) => {
    try {

        let {username,password} = req.body;

        console.log(username , password);

        res.json({
            response : true,
            message : "Credential received"
        })

    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}