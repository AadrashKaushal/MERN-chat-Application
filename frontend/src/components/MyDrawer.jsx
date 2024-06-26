import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import SearchUsers from './SearchUsers';
import { useUserProfile } from '../context/ChatContext';
import { searchingUser } from '../Api/chatPageApis';

export default function MyDrawer({ isOpen, onClose }) {

  let [searchValue,setSearchValue] = useState("");
  let [boolean,setBoolean] = useState(false);
  let {setSearchUser , userProfile} = useUserProfile();
  const  getSearchValue = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value);
    setBoolean(!boolean);
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

  },[boolean]);

  const handleChats = async(val) => {
    let users = {
        user : []
    }
    users.user.push(val._id);
    users.user.push(userProfile._id);

    let token = localStorage.getItem("token");

    let response = await saveUserChats('chats',users,token);
    if(response.response) {
          onClose;
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