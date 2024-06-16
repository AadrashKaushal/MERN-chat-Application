import React from "react";

export default function Login() {
    return (
        <>
            <center>
                <div className=" space-y-6 mt-20">
                    <div className=" w-[30rem] h-20 bg-white rounded-lg p-4">
                        <h1 className="text-3xl font-normal text-gray-600">Talk-A-Tive</h1>
                    </div>
                    <div className="w-[30rem] h-96 bg-white rounded-lg pt-8">
                        <div>
                            <div className=" flex space-x-12 ml-6 mr-6">
                                <h1 className="text-base w-48 p-1 rounded-2xl bg-blue-200 cursor-pointer">Login</h1>
                                <h1 className="text-base w-48 p-1 rounded-2xl cursor-pointer">Sign Up</h1>
                            </div>
                            <div className="flex">
                                <form className="ml-6 mr-6 mt-8 space-y-3">
                                    <h1 className="text-sm font-semibold flex">Email Address <span className="text-red-600">*</span></h1>
                                    <input type="email" className="w-[26rem]  text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="name@example.com" />
                                    <h1 className="text-sm font-semibold flex">Password <span className="text-red-600">*</span></h1>
                                    <input type="password" className="w-[26rem] text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="Enter Password" />
                                    <div>
                                        <button type="button" className="text-center absolute text-xs w-12 h-6 font-semibold mt-[-2.8rem] ml-[9.5rem] p-1 rounded-md bg-gray-100">Show</button>
                                    </div>
                                    <div>
                                        <button type="button" className="w-[26rem] text-center mt-6 text-white h-10 rounded-md hover:bg-blue-500 bg-blue-400">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}