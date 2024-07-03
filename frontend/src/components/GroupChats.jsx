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
import SearchUsers from './SearchUsers';
import { useState, useEffect } from 'react';
import { useUserProfile } from '../context/ChatContext';
import { searchingUser,groupChats } from '../Api/chatPageApis';
import { CloseIcon } from "@chakra-ui/icons"

export default function GroupChats({ isOpen, onClose }) {

    let [searchValue, setSearchValue] = useState("");
    let [changer, setChanger] = useState(false);
    let { setSearchUser, userProfile, boolean, setBoolean } = useUserProfile();
    let [groupChatting, setGroupChatting] = useState([]);

    let [createGroup, setGroup] = useState({
        user: [],
        chatName: "",
        groupAdmin: ""
    });

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

    const getValue = (e) => {
        let { name, value } = e.target;
        if (name === "chatName") {
            createGroup.chatName = value;
            createGroup.groupAdmin = userProfile._id;
            setGroup({...createGroup});
        } else {
            setSearchValue(value);
            setChanger(!changer);
        }

    }

    const addUsers = (val) => {
        if (!groupChatting.includes(val)) {
            groupChatting.push(val);
            setGroupChatting([...groupChatting]);
        }
    }

    const removeUser = (val) => {
        let index = 0;
        groupChatting.forEach((value, i) => {
            if (value._id == val._id) {
                index = i
            }
        })

        groupChatting.splice(index, 1);
        setGroupChatting([...groupChatting]);
    }

    const creatingGroupChat = async()=>{
        
        let addedUsers = [];
        addedUsers.push(userProfile._id);
        groupChatting.forEach((val)=>{
            addedUsers.push(val._id);
        })

        createGroup.user = [...addedUsers];
        setGroup({...createGroup})
       
        let token = localStorage.getItem("token");
        // console.log(createGroup);
        let response = await groupChats('groupChats',createGroup,token);

        if(response.response){
            setBoolean(!boolean);
            onClose();
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
                    <AlertDialogHeader textAlign={"center"} fontSize={"28"} fontWeight={"semi-bold"}>Create Group Chat</AlertDialogHeader>
                    <AlertDialogCloseButton bgColor={'white'} _hover={"white"} />
                    <AlertDialogBody>
                        <center>
                            <div className=' space-y-5'>
                                <Input placeholder='Chat Name' name="chatName" onChange={getValue} />
                                <Input placeholder='Add Users eg: John, Piyush, Jane' name="addUsers" onChange={getValue} />
                            </div>
                        </center>
                        <div className='flex flex-wrap  gap-x-2 gap-y-1'>
                            {
                                groupChatting.length > 0 &&
                                groupChatting.map((value) => {
                                    return <p className='bg-purple-600 text-white text-sm font-semibold mt-3 mb-[-0.2rem] rounded-lg pl-2 pr-2 p-1'>{value.fullname} <CloseIcon cursor={"pointer"} fontSize={"x-small"} marginLeft={"1"} marginTop={"-0.2rem"} onClick={() => { removeUser(value) }} /></p>
                                })
                            }
                        </div>
                        <SearchUsers handleChats={addUsers} />
                        <Button colorScheme='blue' mt={"8"} mb={"2"} float={"right"} onClick={creatingGroupChat}>Create chat</Button>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}