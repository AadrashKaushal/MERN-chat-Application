import { useNavigate } from "react-router-dom"
import { Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import MyChats from "../../components/MyChats.jsx"
import Navbar from "../../components/Navbar.jsx";
import * as chatPageApis from '../../Api/chatPageApis.js'
import { useUserProfile } from '../../context/ChatContext.jsx';
import { useToast } from '@chakra-ui/react'
import RealTimeChat from "../../components/RealTimeChat.jsx";
import io from "socket.io-client";

export default function Home() {
  const toast = useToast();
  let { setUserProfile, setMyChats, userProfile, boolean, liveChatting , renderRealTimeChat } = useUserProfile();
  let navigate = useNavigate();

  useEffect(() => {
    
    let token = localStorage.getItem('token');
    chatPageApis.userProfileData('userProfile', token).then((res) => {

      if (res.response) {

        setUserProfile(res.data);

        toast({
          title: 'Success',
          description: "Login Successfully",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

      } else {
        navigate('/')
      }

    }).catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    if (userProfile.hasOwnProperty("fullname")) {
      let token = localStorage.getItem("token");
      chatPageApis.myChats('myChats', token, userProfile._id).then((res) => {
        setMyChats([...res.data])
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [userProfile, boolean]);


  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem className="bg-gray-200 h-14 w-[100vw]" area={'header'}>
          <Navbar />
        </GridItem>
        <GridItem pl='2' className="ml-5 mt-5 w-[30rem] h-[88vh] overflow-y-scroll overflow-x-hidden mb-5 bg-white rounded-md" area={'nav'}>
          <MyChats />
        </GridItem>
        <GridItem pl='2' className="bg-white rounded-md ml-[23rem] mt-5 h-[88vh] mb-5 mr-5" area={'main'}>
          {
            liveChatting.length > 0 ?
              <RealTimeChat /> :
              <h1 className="text-center mt-[41vh] text-3xl font-thin">Click on a user to start chatting </h1>
          }
        </GridItem>
      </Grid>
    </>
  )
}




