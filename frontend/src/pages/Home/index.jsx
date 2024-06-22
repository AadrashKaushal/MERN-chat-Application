import { useParams } from "react-router-dom"
import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react';
import MyChats from "../../components/MyChats.jsx"
import Navbar from "../../components/Navbar.jsx";

export default function Home() {
  const params = useParams();

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
        <GridItem pl='2' className="ml-5 mt-5 w-[30rem] h-[88vh] mb-5 bg-white rounded-md" area={'nav'}>
          <MyChats />
        </GridItem>
        <GridItem pl='2' className="bg-white rounded-md ml-[23rem] mt-5 h-[88vh] mb-5 mr-5" area={'main'}>
          <h1 className="text-center mt-[41vh] text-3xl font-thin">Click on a user to start chatting </h1>
        </GridItem>
      </Grid>
    </>
  )
}




