import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function LogoutAccount({isOpen , onClose}) {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/')
    }

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
                    <AlertDialogHeader>Logout Account ?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to logout  your account ?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button  onClick={onClose}>
                            No
                        </Button>
                        <Button ml={3} onClick={handleLogout}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}