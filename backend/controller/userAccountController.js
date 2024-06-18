
export  const signupController = (req,res) => {
    try {
        let {username,email,password} = req.body;
        let profilePicture = req.file;

        console.log(profilePicture)
        res.json({
            response : true,
            data : "get All user Data"
        })

    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}

