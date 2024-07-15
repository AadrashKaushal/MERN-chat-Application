import { IconButton, Button, Input ,useDisclosure} from '@chakra-ui/react'
import { ViewIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useUserProfile } from '../context/ChatContext';
import ChatProfile from './ChatProfile';
import ViewGroupChat from './ViewGroupChat';
import { useEffect,useState } from 'react';
import {sendMessages , getAllMessage} from '../Api/chatPageApis';

export default function RealTimeChat() {
    let viewSoloChat = useDisclosure();
    let viewGroupChat = useDisclosure();

    let {liveChatting , setLiveChatting,userProfile} = useUserProfile();

    let [sendMessage,setSendMessage] = useState({
        readBy : [],
        sender : "",
        content : "",
        chat : ""
    });

    let [messageData,setMessageData] = useState([]);

    useEffect(()=>{

        let token = localStorage.getItem("token");
        if(!liveChatting[0].users) {
            let user  = [];
            user.push(userProfile._id);
            user.push(liveChatting[0]._id);

            getAllMessage('getMessages',user,"",token).then((res) => {
                setMessageData([...res.data]);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            let chatId = liveChatting[0]._id;

            getAllMessage('getMessages',[],chatId,token).then((res) => {
                setMessageData([...res.data]);
            }).catch((err) => {
                console.log(err);
            })

        }

    },[]);

    const handleChatSelection = () => {
        liveChatting.splice(0,liveChatting.length);
        setLiveChatting([...liveChatting]);
    }

    const getContent = (e) => {
        sendMessage.content = e.target.value;
        setSendMessage({...sendMessage});
    }
    
    const handleMessage = async() => {
        sendMessage.sender = userProfile._id;

        if(liveChatting[0].isGroupChat == true){

            liveChatting[0].users.forEach((val) => {
                if(val != userProfile._id){
                    sendMessage.readBy.push(val);
                }
            });
            
            sendMessage.chat = liveChatting[0]._id

        } else {

            sendMessage.readBy.push(liveChatting[0]._id);
            sendMessage.chat = "soloChat"
            
        }

        setSendMessage({...sendMessage});

        let token = localStorage.getItem("token");

        let response = await sendMessages('sendMessages',sendMessage,token);

        if(response.response) {
            console.log(response.message);
            sendMessage.readBy.splice(0,sendMessage.readBy.length);
            setSendMessage({...sendMessage});
        } else {
            console.log(res.message);
        }

    } 

    return (
        <>
            <div className=''>
                <div className='flex justify-between ml-3 mr-4 mt-3 sticky'>
                    <IconButton icon={<ArrowBackIcon />} onClick={handleChatSelection}/>
                    <p className='text-3xl font-thin text-black'>{liveChatting[0].isGroupChat ? liveChatting[0].chatname : liveChatting[0].fullname}</p>
                    <IconButton icon={<ViewIcon />} onClick={liveChatting[0].isGroupChat ? viewGroupChat.onOpen : viewSoloChat.onOpen}/>
                    <ChatProfile isOpen={viewSoloChat.isOpen} onClose={viewSoloChat.onClose}/>
                   <ViewGroupChat isOpen ={viewGroupChat.isOpen} onClose={viewGroupChat.onClose}/> 
                </div>
                <div className=' h-[35rem] w-[60rem] ml-2 mt-4 rounded-md mr-3 bg-gray-100 space-y-6'>
                    <div className='w-[45 rem] h-[30rem] flex flex-col space-y-3 ml-4  mt-4 overflow-y-scroll overflow-x-hidden'>
                        
                        {
                            messageData.map((val) => {

                                return (
                                    <div className='mt-3 mr-4'>
                                        <span className='font-normal bg-blue-100 text-black float-right p-2 pl-3 pr-3 rounded-full'>{val.content}</span>
                                    </div>
                                ) 
                            })
                        }
                    </div>
                    <div className='flex space-x-5 justify-between ml-4 mr-4'>
                        <Input placeholder='Enter the message...' fontWeight={"normal"} width={"54rem"} onChange={getContent}/>
                        <Button bgColor={"gray.200"}  float={"right"} onClick={handleMessage}>Send</Button>
                    </div>
                </div>
            </div>
        </>
    );
}