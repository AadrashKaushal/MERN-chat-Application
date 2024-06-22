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

export default function MyProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <ChevronDownIcon className="text-xl mt-2" />
                </PopoverTrigger>
                <PopoverContent className='mr-4' width={"44"}>
                    <PopoverArrow />
                    <PopoverHeader>
                        <p className='cursor-pointer mb-1 mt-1 font-normal w-40' onClick={onOpen}>My Profile</p>
                        <ViewProfile isOpen={isOpen} onClose={onClose}/>
                    </PopoverHeader>
                    <PopoverBody>
                    <p className='cursor-pointer mb-1 mt-1 font-normal w-40'>Log out</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}