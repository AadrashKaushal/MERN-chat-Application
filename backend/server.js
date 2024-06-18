import express from 'express';
import bodyParser from 'body-parser';
import userAccountRouter from './routes/userAccountRoutes.js';

import 'dotenv/config'

const App = express();
const port = process.env.server_running_port

// Apply middlewares and cors

App.use((req,res,next)=>{
    res.setHeader('Access-control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false}))

// adding routes
App.use(userAccountRouter);

App.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
})