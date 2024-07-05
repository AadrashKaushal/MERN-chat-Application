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
import {searchingUser, displayGroupChat, deleteUsers, updateChatname } from '../Api/chatPageApis';
import { useToast } from '@chakra-ui/react'
import SearchUsers from './SearchUsers';

export default function ViewGroupChat({ isOpen, onClose }) {
    let toast = useToast();
    let { setSearchUser,userProfile, liveChatting, setLiveChatting, boolean, setBoolean } = useUserProfile();
    let [viewGroupChat, setViewGroupChat] = useState([]);
    let [addedUsers, setAddedUsers] = useState(false);
    let [changeChatName, setChangeChatName] = useState("");
    let [changer, setChanger] = useState(false);
    let [searchValue,setSearchValue] = useState();

    useEffect(() => {

        let token = localStorage.getItem("token")

        if (liveChatting.length > 0) {
            displayGroupChat('viewGroupChats', liveChatting[0], token).then((res) => {
                setViewGroupChat([...res.data]);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            onClose();
        }
    }, [addedUsers])


    useEffect(() => {
        if (searchValue != "") {
            let token = localStorage.getItem("token");
            searchingUser('searchUsers', token, searchValue).then((res) => {
                setSearchUser([...res.data]);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            setSearchUser([...[]]);
        }

    }, [changer]);


    const handleDeletedUsers = async (value) => {
        let user = [];

        liveChatting[0].users.forEach((val) => {
            if (value._id !== val) {
                user.push(val);
            }
        })

        let objectId = liveChatting[0]._id;

        if (user.length == 0) {
            liveChatting.pop();
            setLiveChatting([...liveChatting]);

        } else {

            liveChatting[0].users = [...user];
            setLiveChatting([...liveChatting]);

        }


        let obj = {
            id: objectId,
            users: user
        }

        let token = localStorage.getItem("token");
        let response = await deleteUsers('deleteUsers', obj, token);

        if (response.response) {
            setAddedUsers(!addedUsers);
            if (user.length === 0) {
                setBoolean(!boolean);
            }
        }
    }

    const getChatName = (e) => {
        setChangeChatName(e.target.value);
    }

    const updateGroupName = async () => {
        if (userProfile._id === liveChatting[0].groupAdmin) {

            let obj = {
                id: liveChatting[0]._id,
                chatname: changeChatName
            }

            let token = localStorage.getItem("token");

            let response = await updateChatname('updateChatname', obj, token);

            if (response.response) {
                liveChatting.pop();
                setLiveChatting([...liveChatting]);
                onClose();
                setBoolean(!boolean);
            }
        } else {

            toast({
                title: 'Error',
                description: "Only Admin Can Change the GroupName",
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
      
        }

    }

    const getValue = (e) => {
        let {  value } = e.target;
        setSearchValue(value);
        setChanger(!changer);
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
                                    viewGroupChat.map((val) => {
                                        return (
                                            <p className='bg-purple-600 text-white text-sm font-semibold mt-2 mb-3 rounded-lg pl-2 pr-2 p-1'>{val.fullname}<CloseIcon cursor={"pointer"} fontSize={"x-small"} marginLeft={"1"} marginTop={"-0.2rem"} onClick={() => { handleDeletedUsers(val) }} /></p>
                                        );
                                    })
                                }
                            </div>
                            <div className=' space-y-5'>
                                <div className='flex justify-between space-x-2'>
                                    <Input placeholder='Chat Name' onChange={getChatName} />
                                    <Button colorScheme='green' onClick={updateGroupName}>Update</Button>
                                </div>
                                <Input placeholder='Add User to group' onChange={getValue}/>
                            </div>
                        </center>
                                <SearchUsers/>

                        <Button colorScheme='red' mt={"8"} mb={"2"} float={"right"} >Leave Group</Button>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}