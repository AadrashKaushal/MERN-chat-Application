import { useParams } from "react-router-dom"
import { Grid, GridItem } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons"
import { BellIcon,ChevronDownIcon,AddIcon } from "@chakra-ui/icons"
import { IconButton } from '@chakra-ui/react'
import { Avatar} from '@chakra-ui/react'

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
                <GridItem pl='2' className="bg-gray-200 h-14" area={'header'}>
                    <Box className="bg-white h-12 m-[0.2rem] pt-1.5">
                        <div className="flex justify-between ml-5 mr-5 ">
                            <Button leftIcon={<SearchIcon className="mr-2 text-gray-600" />} className="text-gray-600  font-semibold">
                                Search User
                            </Button>
                            <h1 className="text-2xl font-normal text-gray-600">Talk-A-Tive</h1>
                            <div className="flex space-x-4" >
                                <IconButton icon={<BellIcon />} className="text-2xl"/>
                                <Avatar name='Dan Abrahmov' className="bg-gray-200 rounded-full p-2 text-sm"/>
                                <IconButton icon={<ChevronDownIcon />} />
                            </div>
                        </div>
                    </Box>
                </GridItem>
                <GridItem pl='2' className="ml-5 mt-5 w-[30rem] h-[88vh] mb-5 bg-white rounded-md" area={'nav'}>
                    <div>
                        <div className=" flex justify-center space-x-32 mt-6">
                            <h1 className="text-3xl font-thin">My Chats</h1>
                            <Button rightIcon={<AddIcon className="mr-2 text-gray-600" />} className="bg-gray-100 h-[2.5rem] w-48 text-lg text-gray-600  font-normal rounded-md">
                                New Group Chat
                            </Button>
                        </div>
                    </div>
                </GridItem>
                <GridItem pl='2' className="bg-white rounded-md ml-[23rem] mt-5 h-[88vh] mb-5 mr-5" area={'main'}>
                    <h1 className="text-center mt-[41vh] text-3xl font-thin">Click on a user to start chatting </h1>
                </GridItem>
            </Grid>
        </>
    )
}