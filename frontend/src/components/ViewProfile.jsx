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


export default function ViewProfile({ isOpen, onClose }) {
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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>Aadrash Kaushal</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"xl"} />
                            <p className='text-2xl mt-5 mb-5 text-gray-600 font-normal'>Email : sharmaadarsh180@gmail.com</p>
                        </center>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}