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

export default function ViewProfile({ isOpen, onClose }) {
    let {userProfile} = useUserProfile();

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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>{userProfile.fullname}</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"xl"} />
                            <p className='text-2xl mt-5 mb-5 text-gray-600 font-normal'>Email : {userProfile.email}</p>
                        </center>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}