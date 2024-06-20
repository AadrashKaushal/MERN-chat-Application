import mongoose from "mongoose";
import 'dotenv/config'

export  const conect = mongoose.connect(process.env.mongoDB_connection).then((res)=>{
    console.log("Connected with mongoDB server");
}).catch((err) => {
    console.log(err);
    console.log("some error has been occur while connecting with mongoDB")
})