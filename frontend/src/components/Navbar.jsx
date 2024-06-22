import { Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons"
import { BellIcon } from "@chakra-ui/icons"
import MyDrawer from './MyDrawer.jsx'
import { Avatar } from '@chakra-ui/react'
import React from 'react'
import {
    useDisclosure
} from '@chakra-ui/react';
import MyProfile from './MyProfile.jsx'

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    return (
        <>
            <Box className="bg-white h-12 m-[0.2rem] pt-1.5">
                <div className="flex justify-between ml-5 mr-5 ">
                    <Button leftIcon={<SearchIcon className="mr-2 text-gray-600" />} className="text-gray-600  font-semibold " _hover={"white"} mt={"-0.5"} bgColor={"white"} onClick={onOpen}>
                        Search User
                    </Button>
                    <h1 className="text-2xl font-normal text-gray-600">Talk-A-Tive</h1>
                    <div className="flex space-x-4" >
                        <BellIcon className="text-xl mt-2 " />
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"sm"}/>
                        <MyProfile/>
                    </div>
                    <MyDrawer isOpen={isOpen} onClose={onClose} />
                </div>
            </Box>
        </>
    );
}