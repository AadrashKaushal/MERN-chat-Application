import { IconButton, Button, Input } from '@chakra-ui/react'
import { ViewIcon, ArrowBackIcon } from '@chakra-ui/icons'

export default function RealTimeChat() {
    return (
        <>
            <div className=''>
                <div className='flex justify-between ml-3 mr-4 mt-3 sticky'>
                    <IconButton icon={<ArrowBackIcon />} />
                    <p className='text-3xl font-thin text-black'>Aadrash Kaushal</p>
                    <IconButton icon={<ViewIcon />} />
                </div>
                <div className=' h-[35rem] w-[60rem] ml-2 mt-4 rounded-md mr-3 bg-gray-100 '>
                    
                    <div className='flex space-x-5 justify-between ml-4 mr-4 pt-[31.5rem]'>
                        <Input placeholder='Enter the message...' fontWeight={"normal"} width={"54rem"} />
                        <Button bgColor={"gray.200"}  float={"right"}>Send</Button>
                    </div>
                </div>
            </div>
        </>
    );
}