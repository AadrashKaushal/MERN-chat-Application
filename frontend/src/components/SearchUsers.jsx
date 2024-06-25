import { Avatar } from '@chakra-ui/react'


export default function SearchUsers() {

    return (
        <>
            <div className="bg-gray-200 w-[17rem] cursor-pointer group hover:bg-blue-400 rounded-md flex space-x-2 h-16 pl-2 pt-2" >
                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={"sm"} mt={"1"}/>
                <div className=''>
                    <h1 className="text-base text-black group-hover:text-white font-semibold">Aadrash kaushal</h1>
                    <p className='text-xs group-hover:text-white'><span className='font-bold'>Email :</span> sharmaadarsh180@gmail.com</p>
                </div>
            </div>
        </>
    );
}