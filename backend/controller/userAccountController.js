export  const signupController = (req,res) => {
    try {
        let {username,email,password} = req.body;
        let profilePicture = req.file;

        console.log(profilePicture)
        
        res.json({
            response : true,
            message : "get All user Data"
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