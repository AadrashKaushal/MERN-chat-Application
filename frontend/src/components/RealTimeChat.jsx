import { IconButton, Button, Input, useDisclosure } from '@chakra-ui/react'
import { ViewIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useUserProfile } from '../context/ChatContext';
import ChatProfile from './ChatProfile';
import ViewGroupChat from './ViewGroupChat';
import { useEffect, useState } from 'react';
import { sendMessages, getAllMessage } from '../Api/chatPageApis';
import Lottie from "react-lottie";
import io from 'socket.io-client';
import animationData from "../animations/typing.json";


export default function RealTimeChat() {
    const socket = io.connect('http://localhost');
    let viewSoloChat = useDisclosure();
    let viewGroupChat = useDisclosure();

    let { liveChatting, setLiveChatting, userProfile, setRefreshChats, refreshChats, groupChatName } = useUserProfile();

    let [sendMessage, setSendMessage] = useState({
        readBy: [],
        sender: "",
        content: "",
        chat: ""
    });

    let [messageData, setMessageData] = useState([]);
    let [isTyping, setIsTyping] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    useEffect(() => {

        let token = localStorage.getItem("token");
        if (!liveChatting[0].users) {
            let user = [];
            user.push(userProfile._id);
            user.push(liveChatting[0]._id);

            getAllMessage('getMessages', user, "", token).then((res) => {
                setMessageData([...res.data]);
                socket.emit("createRoom", { chatId: res.data[0].chat });
            }).catch((err) => {
                console.log(err);
            })
        } else {
            let chatId = liveChatting[0]._id;
            socket.emit("createRoom", { chatId: liveChatting[0]._id });
            getAllMessage('getMessages', [], chatId, token).then((res) => {
                setMessageData([...res.data]);
            }).catch((err) => {
                console.log(err);
            })

        }

        

    }, [refreshChats]);

    useEffect(() => {

        if (sendMessage.content != "") {
            if (liveChatting[0].isGroupChat === true) {
                socket.emit("typing", { chatId: liveChatting[0]._id, userId: userProfile._id });
            } else {
                socket.emit("typing", { chatId: messageData[0].chat, userId: userProfile._id });
            }
        }
    }, [sendMessage.content])


    useEffect(() => {
        socket.on("sender-typing", ({ userId }) => {
            if (userId != userProfile._id) {
                setIsTyping(true);
            }
        })

        socket.on("stop-typing", ({ userId }) => {
            if (userId != userProfile._id) {
                setIsTyping(false);
            }
        })


        socket.on('new-message',({data}) => {
            setRefreshChats(!refreshChats);
            messageData.push(data);
            setMessageData([...messageData]);
        })
        
        
    })

    


    const handleChatSelection = () => {
        liveChatting.splice(0, liveChatting.length);
        setLiveChatting([...liveChatting]);
    }

    const getContent = (e) => {
        sendMessage.content = e.target.value;
        setSendMessage({ ...sendMessage });
    }

    const handleMessage = async () => {

        if (liveChatting[0].isGroupChat === true) {
            socket.emit("stop-typing", { chatId: liveChatting[0]._id, userId: userProfile._id });

        } else {
            socket.emit("stop-typing", { chatId: messageData[0].chat, userId: userProfile._id });
        }

        sendMessage.sender = userProfile._id;

        if (liveChatting[0].isGroupChat == true) {

            liveChatting[0].users.forEach((val) => {
                if (val != userProfile._id) {
                    sendMessage.readBy.push(val);
                }
            });
            
            sendMessage.chat = liveChatting[0]._id

        } else {

            sendMessage.readBy.push(liveChatting[0]._id);
            sendMessage.chat = "soloChat"

        }

        setSendMessage({ ...sendMessage });

        let token = localStorage.getItem("token");

        let response = await sendMessages('sendMessages', sendMessage, token);

        if (response.response) {
            socket.emit("new-message",{chatId : messageData[0].chat , data : sendMessage});
            sendMessage.readBy.splice(0, sendMessage.readBy.length);
            setSendMessage({ ...sendMessage });
            setRefreshChats(!refreshChats);
            sendMessage.content = "";
            setSendMessage({ ...sendMessage });

        } else {
            console.log(res.message);
        }

    }



    return (
        <>
            <div className=''>
                <div className='flex justify-between ml-3 mr-4 mt-3 sticky'>
                    <IconButton icon={<ArrowBackIcon />} onClick={handleChatSelection} />
                    <p className='text-3xl font-thin text-black'>{liveChatting[0].isGroupChat ? liveChatting[0].chatname : liveChatting[0].fullname}</p>
                    <IconButton icon={<ViewIcon />} onClick={liveChatting[0].isGroupChat ? viewGroupChat.onOpen : viewSoloChat.onOpen} />
                    <ChatProfile isOpen={viewSoloChat.isOpen} onClose={viewSoloChat.onClose} />
                    <ViewGroupChat isOpen={viewGroupChat.isOpen} onClose={viewGroupChat.onClose} />
                </div>
                <div className=' h-[35rem] w-[60rem] ml-2 mt-4 rounded-md mr-3 bg-gray-100 space-y-6'>
                    <div className='w-[45 rem] h-[30rem] flex flex-col space-y-3 ml-4  mt-4 overflow-y-scroll overflow-x-hidden'>

                        {
                            messageData.map((val) => {

                                return (
                                    <div className='mt-3 mr-4'>
                                        {
                                            liveChatting[0].isGroupChat === true ?
                                                val.sender == userProfile._id ?
                                                    <span className='font-normal bg-blue-100 text-black float-right p-2 pl-5 pr-5 rounded-full'>{val.content}</span> :
                                                    groupChatName.map((data) => {
                                                        return (
                                                            data._id == val.sender &&
                                                            <span className='font-normal bg-green-100 text-black float-left p-2 pl-5 pr-5 rounded-full'><span className='block text-xs text-blue-600 font-semibold'>{data.fullname}</span>{val.content}</span>
                                                        )
                                                    }) :
                                                val.sender === userProfile._id ?
                                                    <span className='font-normal bg-blue-100 text-black float-right p-2 pl-5 pr-5 rounded-full'>{val.content}</span>

                                                    :
                                                    <span className='font-normal bg-green-100 text-black float-left p-2 pl-3 pr-3 rounded-full'>{val.content}</span>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            isTyping == true &&
                            <div className=''>
                                <Lottie
                                    options={defaultOptions}
                                    height={20}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0  }}
                                />
                            </div>
                        }
                    </div>
                    <div className='flex space-x-5 justify-between ml-4 mr-4'>
                        <Input placeholder='Enter the message...' value={sendMessage.content} fontWeight={"normal"} width={"54rem"} onChange={getContent} />
                        <Button bgColor={"gray.200"} float={"right"} onClick={handleMessage}>Send</Button>
                    </div>
                </div>
            </div>
        </>
    );
}