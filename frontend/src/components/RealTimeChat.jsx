import { IconButton, Button, Input ,useDisclosure} from '@chakra-ui/react'
import { ViewIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useUserProfile } from '../context/ChatContext';
import ChatProfile from './ChatProfile';
import ViewGroupChat from './ViewGroupChat';

export default function RealTimeChat() {
    let viewSoloChat = useDisclosure();
    let viewGroupChat = useDisclosure();

    let {liveChatting , setLiveChatting} = useUserProfile();

    const handleChatSelection = () => {
        liveChatting.splice(0,liveChatting.length);
        setLiveChatting([...liveChatting]);
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
                <div className=' h-[35rem] w-[60rem] ml-2 mt-4 rounded-md mr-3 bg-gray-100 '>
                    
                    <div className='flex space-x-5 justify-between ml-4 mr-4 pt-[31.5rem]'>
                        <Input placeholder='Enter the message...' fontWeight={"normal"} width={"54rem"} />
                        <Button bgColor={"gray.200"}  float={"right"}>Send</Button>
                    </div>
                </div>
            </div>
        </>
    );
}