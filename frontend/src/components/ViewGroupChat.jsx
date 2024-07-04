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
import { useEffect, useState } from 'react';
import { displayGroupChat,deleteUsers } from '../Api/chatPageApis';

export default function ViewGroupChat({isOpen , onClose}) {
    let {liveChatting } = useUserProfile();
    let [viewGroupChat , setViewGroupChat] = useState([]);
    let [addedUsers,setAddedUsers] = useState(false);
  

    useEffect(()=>{

        let token = localStorage.getItem("token");
            displayGroupChat('viewGroupChats',liveChatting[0],token).then((res)=>{
                setViewGroupChat([...res.data]);
            }).catch((err)=>{
                console.log(err);
            })
        
    },[addedUsers])


    const handleDeletedUsers = async(value) => {
        let users = [];
        liveChatting[0].users.forEach((val) => {
            if(value._id !== val){
                users.push(val);
            }
        })

        let obj = {
            id : liveChatting[0]._id,
            users : users
        }

        let token = localStorage.getItem("token");
        let response = await deleteUsers('deleteUsers',obj,token);

        if(response.response) {
            setAddedUsers(!addedUsers);
        }
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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>{liveChatting[0].chatname}</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                        <div className='flex flex-wrap  gap-x-2 gap-y-1'>
                            {
                                viewGroupChat.map((val)=>{
                                    return (
                                        <p className='bg-purple-600 text-white text-sm font-semibold mt-2 mb-3 rounded-lg pl-2 pr-2 p-1'>{val.fullname}<CloseIcon cursor={"pointer"} fontSize={"x-small"} marginLeft={"1"} marginTop={"-0.2rem"} onClick={()=>{handleDeletedUsers(val)}}/></p>
                                    );
                                })
                            }
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