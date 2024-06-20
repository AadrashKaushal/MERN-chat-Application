import pkg from 'jsonwebtoken';
const {sign} = pkg;

export const generateToken = (payloadData) => {
    let token = sign({payloadData : payloadData},process.env.secret_key);
    return token;
}

