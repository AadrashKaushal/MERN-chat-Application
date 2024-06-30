import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useDisclosure,useToast
} from '@chakra-ui/react';
import SearchUsers from './SearchUsers';
import { useUserProfile } from '../context/ChatContext';
import { searchingUser } from '../Api/chatPageApis';
import { saveUserChats } from '../Api/chatPageApis';

export default function MyDrawer({ isOpen, onClose }) {
  let toast = useToast();
  let [searchValue,setSearchValue] = useState("");
  let [changer,setChanger] = useState(false);
  let {setSearchUser , userProfile ,boolean, setBoolean} = useUserProfile();
  const  getSearchValue = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value);
    setChanger(!changer);
  }


  useEffect(()=>{
    if(searchValue != "") {
        let token = localStorage.getItem("token");
        searchingUser('searchUsers',token,searchValue).then((res)=> {
          setSearchUser([...res.data]);
        }).catch((err) => {
          console.log(err);
        })
    } else {
      setSearchUser([...[]]);
    }

  },[changer]);

  const handleChats = async(val) => {
    let users = {
        user : []
    }
    users.user.push(val._id);
    users.user.push(userProfile._id); 

    let token = localStorage.getItem("token");

    let info = await saveUserChats('chats',users,token);

    if(info.response) {

      onClose();
      setBoolean(!boolean);
      setSearchUser([...[]]);
    } else {
      onClose();
      toast({
        title: 'Error',
        position : 'top-center',
        description: info.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setSearchUser([...[]]);
    }
}

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search User</DrawerHeader>
          <DrawerBody>
            <Input placeholder='Search by name or email' onChange={getSearchValue}/>
            <SearchUsers handleChats = {handleChats} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}