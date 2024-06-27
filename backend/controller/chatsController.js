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

        let myChats = [];
        userChats.forEach((val) => {
            val.users.forEach((value) => {
                if (objectId !== value) {
                    myChats.push(value);
                }
            })
        })

        let chatData = await signupModel.find({ _id: { $in: myChats } });

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