import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import { Input, Button } from '@chakra-ui/react'
import { CloseIcon } from "@chakra-ui/icons"
import { useUserProfile } from '../context/ChatContext';

export default function ViewGroupChat({isOpen , onClose}) {
    let {liveChatting } = useUserProfile();
    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>{liveChatting[0].chatname}</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                        <div className='flex flex-wrap  gap-x-2 gap-y-1'>
                            <p className='bg-purple-600 text-white text-sm font-semibold mt-2 mb-3 rounded-lg pl-2 pr-2 p-1'>Aadrash kaushal <CloseIcon cursor={"pointer"} fontSize={"x-small"} marginLeft={"1"} marginTop={"-0.2rem"} /></p>
                        </div>
                            <div className=' space-y-5'>
                                <div className='flex justify-between space-x-2'>
                                    <Input placeholder='Chat Name' />
                                    <Button colorScheme='green' >Update</Button>
                                </div>
                                <Input placeholder='Add User to group' />
                            </div>
                        </center>
                        
                        <Button colorScheme='red' mt={"8"} mb={"2"} float={"right"} >Leave Group</Button>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}