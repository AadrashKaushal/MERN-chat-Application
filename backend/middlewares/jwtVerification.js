import pkg from 'jsonwebtoken';
const {verify} = pkg;

export const jwtVerification = (req,res,next) => {
    try {

        let tokenData = req.header('Authorization').split(" ")
        let token = tokenData[1];

        let secretKey = process.env.secret_key;

        let userDetails = verify(token,secretKey);

        if(userDetails) {
            req.userData = userDetails;
            next();
        } else {
            res.json({
                response : false,
                message : "InValid Token"
            })
        }
       

    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}