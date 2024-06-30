import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import { Button, Avatar } from '@chakra-ui/react'
import { useUserProfile } from '../context/ChatContext';

export default function ChatProfile({isOpen , onClose}) {
    let {liveChatting} = useUserProfile();
    
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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>{liveChatting[0].fullname}</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"xl"} />
                            <p className='text-2xl mt-5 mb-5 text-gray-600 font-normal'>Email : {liveChatting[0].email}</p>
                        </center>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}