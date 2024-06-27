import { Avatar } from '@chakra-ui/react'
import { useUserProfile } from '../context/ChatContext';
import { useEffect } from 'react';
export default function ChatUsers() {
    let { myChats } = useUserProfile();
    return (
        <>
            <div className=' space-y-4 pt-4'>
                {
                    myChats.length > 0 &&
                    myChats.map((val) => {
                        return (
                            <div className="bg-gray-200 w-[26rem] ml-4 mr-2 h-12 rounded-md group hover:bg-blue-400 cursor-pointer pl-4 pt-3" >
                                <h1 className="text-md text-black group-hover:text-white  font-semibold">{val.fullname}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}