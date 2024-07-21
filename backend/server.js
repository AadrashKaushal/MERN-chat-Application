import express from 'express';
import bodyParser from 'body-parser';
import userAccountRouter from './routes/userAccountRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import { conect } from './databaseConnection.js';
import { chats } from './Models/chats.js';
import http from 'http';
import {Server} from 'socket.io';


import 'dotenv/config'
import { join } from 'path';

const App = express();
const server = http.createServer(App);

const port = process.env.server_running_port

// Apply middlewares and cors

App.use((req,res,next)=>{
    res.setHeader('Access-control-Allow-Origin','http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

const io = new Server(server,{
    pingTimeout : 60000,
    cors : {
        origin: "http://localhost:5173",
    }
});

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false}))

// adding routes
App.use(userAccountRouter);
App.use(chatRouter);

server.listen(port,()=>{
    console.log(`Server Started at port ${port}`);
})



io.on('connection',(socket) => {
    
    console.log("socket Connected");
    socket.on('createRoom',({chatId}) => {
        socket.join(`room-${chatId}`);
        console.log("room joined")
    })

    socket.on('typing',({userId , chatId}) => {
        io.to(`room-${chatId}`).emit('sender-typing',{chatId : chatId , userId : userId });
    })

    socket.on('stop-typing',({userId , chatId}) => {
        io.to(`room-${chatId}`).emit('stop-typing',{chatId : chatId , userId : userId });
    })

    socket.on("new-message",({chatId , data}) => {
        console.log(data);
        io.to(`room-${chatId}`).emit("new-message",{data : data});
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})




