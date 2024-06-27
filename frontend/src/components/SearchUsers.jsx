import { Avatar } from '@chakra-ui/react'
import { useUserProfile } from '../context/ChatContext';
import { useEffect, useState } from 'react';

export default function SearchUsers({handleChats}) {
    let { searchUser } = useUserProfile();
    
    return (
        <>
            <div className='mt-4 space-y-3'>
                {
                    searchUser.length > 0 &&
                    searchUser.map((val) => {
                        return (
                            <div className="bg-gray-200 w-[17rem] cursor-pointer group hover:bg-blue-400 rounded-md flex space-x-2 h-16 pl-2 pt-2" onClick={() => {handleChats(val)}}>
                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"sm"} mt={"1"} />
                                <div className=''>
                                    <h1 className="text-base text-black group-hover:text-white font-semibold">{val.fullname}</h1>
                                    <p className='text-xs group-hover:text-white'><span className='font-bold'>Email : </span>{val.email}</p>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </>
    );
}