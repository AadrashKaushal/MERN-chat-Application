import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'

import { ChevronDownIcon } from "@chakra-ui/icons"
import ViewProfile from './ViewProfile'
import { useDisclosure } from '@chakra-ui/react'
import LogoutAccount from './LogoutAccount'

export default function MyProfile() {
    
    let viewProfile = useDisclosure();
    let logoutAccount = useDisclosure();

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <ChevronDownIcon className="text-xl mt-2" />
                </PopoverTrigger>
                <PopoverContent className='mr-4' width={"44"}>
                    <PopoverArrow />
                    <PopoverHeader>
                        <p className='cursor-pointer mb-1 mt-1 font-normal w-40' onClick={viewProfile.onOpen}>My Profile</p>
                        <ViewProfile isOpen={viewProfile.isOpen} onClose={viewProfile.onClose} />
                    </PopoverHeader>
                    <PopoverBody>
                        <p className='cursor-pointer mb-1 mt-1 font-normal w-40' onClick={logoutAccount.onOpen}>Log out</p>
                        <LogoutAccount isOpen={logoutAccount.isOpen } onClose={logoutAccount.onClose } />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}