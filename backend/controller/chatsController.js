import { json, response } from "express";
import { signupModel } from "../Models/signupModel.js";
import { chats } from "../Models/chats.js";

export const getUserProfileController = async (req, res) => {
    try {
        let { payloadData } = req.userData;
        let { email } = payloadData;

        let userProfile = await signupModel.find({ email: email });

        res.json({
            response: true,
            message: "Get user Profile Successfully",
            data: userProfile[0]
        })

    } catch (err) {
        res.json({
            response: false,
            message: "Something went wrong !!"
        });
    }
}

export const searchUserController = async (req, res) => {
    try {

        let { searchUser } = req.query;
        let { payloadData } = req.userData;
        let { email } = payloadData;

        let searchData = await signupModel.find({
            $and: [
                { email: { $ne: email } },
                {
                    $or: [
                        { fullname: { $regex: searchUser, $options: "i" } },
                        { email: { $regex: searchUser, $options: "i" } }
                    ]
                }
            ],

        });

        res.json({
            response: true,
            message: "Search Successfully",
            data: searchData
        })

    } catch (err) {
        console.log(err);

        res.json({
            response: false,
            message: "Something went wrong !!"
        })
    }
}


export const userChatsController = async (req, res) => {
    try {

        let { user } = req.body;
        let userChats = new chats({ isGroupChat: false, users: user, chatname: 'sender' });
        await userChats.save();

        res.json({
            response: true,
            message: "Chat Saved Successfully"
        })

    } catch (err) {
        console.log(err);

        res.json({
            response: false,
            message: "Something went wrong !!"
        })
    }
}


export const getUserChatsController = async (req, res) => {
    try {

        let { objectId } = req.query;

        let userChats = await chats.find({ users: objectId });



        let singleChats = [];
        let groupChats = [];
        userChats.forEach((val) => {
            if (!val.isGroupChat) {
                val.users.forEach((value) => {
                    if (objectId !== value) {
                        singleChats.push(value);
                    }
                })
            }
            else {
                groupChats.push(val);
            }
        })

        let chatData = await signupModel.find({ _id: { $in: singleChats } });
        chatData = [...chatData,...groupChats];

        res.json({
            response: true,
            message: "User chats",
            data: chatData
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

export const groupChatsController = async (req, res) => {
    try {

        let { user, chatName, groupAdmin } = req.body;

        let userChats = new chats({ isGroupChat: true, users: user, chatname: chatName });
        userChats.set('groupAdmin', groupAdmin);

        await userChats.save();
        res.json({
            response: true,
            message: "Group Chat created Successfully"
        })

    } catch (err) {
        console.log(err);

        res.json({
            response: false,
            message: "Something went wrong !!"
        })
    }
}


export const viewGroupChatController = async(req,res) => {
    try {

        let {users} = req.body;
        let viewGroupChat = await signupModel.find({_id : {$in : users}});

        res.json({
            response : true,
            message : "Get group user successfully",
            data : viewGroupChat
        })

    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}

export const deleteUserController = async(req,res) => {
    try {

        let {users , id } = req.body;

        if(users.length == 0) {
            await chats.deleteOne({_id : id});
        } else {
            await chats.updateOne({_id : id} ,{ $set : {users : users}});
        }
        
        res.json({
            response : true,
            message : "User deleted Successfully"
        })
        
    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}

export const updateChatnameController = async(req,res) => {
    try {

        let {id,chatname} = req.body;

        await chats.updateOne({_id : id} ,{ $set : {chatname : chatname}});

        res.json({
            response : true,
            message : "Chatname updated Successfully"
        })

    } catch(err) {
        console.log(err);

        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}