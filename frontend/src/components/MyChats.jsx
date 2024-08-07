import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons"
import GroupChats from './GroupChats';
import { useDisclosure } from '@chakra-ui/react'
import ChatUsers from './ChatUsers.jsx';
import { useUserProfile } from '../context/ChatContext.jsx';

export default function MyChats() {
    const { isOpen, onOpen, onClose } = useDisclosure();  
    let {setSearchUser} = useUserProfile();

    const openGroupChat = () => {
        setSearchUser([...[]]);
        onOpen();
    }

    return (
        <>
            <div>
                <div className=" flex justify-center space-x-32 mt-6">
                    <h1 className="text-3xl font-thin">My Chats</h1>
                    <Button rightIcon={<AddIcon className="mr-2 text-gray-600" />} className="bg-gray-100 h-[2.5rem] w-48 text-lg text-gray-600  font-normal rounded-md" onClick={openGroupChat}>
                        New Group Chat
                    </Button>
                    <GroupChats isOpen={isOpen} onClose={onClose} />
                </div>
                <div className='w-[28rem] mt-4 rounded-md mr-2 '>
                    <ChatUsers />
                </div>
            </div>
        </>
    );
}