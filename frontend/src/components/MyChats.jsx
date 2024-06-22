import { Button } from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons"

export default function MyChats() {
    return (
        <>
            <div>
                <div className=" flex justify-center space-x-32 mt-6">
                    <h1 className="text-3xl font-thin">My Chats</h1>
                    <Button rightIcon={<AddIcon className="mr-2 text-gray-600" />} className="bg-gray-100 h-[2.5rem] w-48 text-lg text-gray-600  font-normal rounded-md">
                        New Group Chat
                    </Button>
                </div>
            </div>
        </>
    );
}