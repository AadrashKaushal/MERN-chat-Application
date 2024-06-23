import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import { Input ,Button } from '@chakra-ui/react'


export default function GroupChats({ isOpen, onClose }) {
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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>Create Group Chat</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                            <div className=' space-y-5'>
                                <Input placeholder='Chat Name' />
                                <Input placeholder='Add Users eg: John, Piyush, Jane' />
                            </div>
                        </center>
                                <Button colorScheme='blue' mt={"8"} mb={"2"} float={"right"}>Create chat</Button>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}