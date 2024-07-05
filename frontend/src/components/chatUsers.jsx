import { Avatar } from '@chakra-ui/react'
import { useUserProfile } from '../context/ChatContext';
import { useState } from 'react';

export default function ChatUsers() {
    let { myChats, setLiveChatting, liveChatting ,setRenderRealTimeChat} = useUserProfile();

    let [divStyle, setDivStyle] = useState({
        bgColor: "bg-gray-200",
    })

    let [h1Style, setH1Style] = useState({
        textColor: "text-black"
    })

    const openChatBox = (val) => {
        liveChatting.splice(0, liveChatting.length);
        setLiveChatting([...liveChatting]);
        liveChatting.push(val);
        setLiveChatting([...liveChatting]);

    }

    return (
        <>
            <div className=' space-y-4 pt-4 pb-4'>
                {
                    myChats.length > 0 &&
                    myChats.map((val) => {
                        return (
                            <div className={`${divStyle.bgColor} w-[26rem] ml-4 mr-2 h-12 rounded-md group hover:bg-blue-400  cursor-pointer pl-4 pt-3`} onClick={() => { openChatBox(val) }}>
                                <h1 className={`text-md ${h1Style.textColor} group-hover:text-white  font-semibold`}>{val.isGroupChat ? val.chatname : val.fullname}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}