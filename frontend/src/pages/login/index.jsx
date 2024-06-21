import React, { useState } from "react";
import { useRef } from "react";
import * as loginApis from "../../Api/loginApis";
import { useNavigate } from "react-router-dom";
export default function Login() {
    let [switcher,setSwitcher] = useState(true);

    let [signupValues,setSignupValues] = useState({
        username : '',
        email : '',
        password : '',
        profilePicture : ''
    })

    let [loginValues,setLoginValues] = useState({
        username : '',
        password : ''
    })

    let loginRef = useRef();
    let signupRef = useRef();

    let loginPasswordRef = useRef();
    let loginPasswordBtnRef = useRef();

    let showPasswordLoginRef = useRef();
    let showPasswordBtnRef = useRef();

    let showConfirmPasswordLoginRef = useRef();
    let showConfirmPasswordBtnRef = useRef();

    let cPass = useRef();

    const handleSwitching = (e) => {
        console.log(e.target.id)
        if(e.target.id === "login") {
            setSwitcher(true);
            signupRef.current.style.backgroundColor = "white"
            loginRef.current.style.backgroundColor = "#bfdbfe"

        } else {
            setSwitcher(false);
            signupRef.current.style.backgroundColor = "#bfdbfe"
            loginRef.current.style.backgroundColor = "white"
        }
    }

    const showPassword = (e) => {
        if(e.target.innerText === "Show") {
            showPasswordLoginRef.current.type = "text"
            showPasswordBtnRef.current.innerText = "Hide"
        } else {
            showPasswordLoginRef.current.type = "password"
            showPasswordBtnRef.current.innerText = "Show"
        }
    }

    const showConfirmPassword = (e) => {
        if(e.target.innerText === "Show") {
            showConfirmPasswordLoginRef.current.type = "text"
            showConfirmPasswordBtnRef.current.innerText = "Hide"
        } else {
            showConfirmPasswordLoginRef.current.type = "password"
            showConfirmPasswordBtnRef.current.innerText = "Show"
        }
    }

    const displayPassword = (e) => {
        if(e.target.innerText === "Show") {
            loginPasswordRef.current.type = "text"
            loginPasswordBtnRef.current.innerText = "Hide"
        } else {
            loginPasswordRef.current.type = "password"
            loginPasswordBtnRef.current.innerText = "Show"
        }
    }


    // handling form Data 
    const handleFormData = (e) => {
        let {name,value,files} = e.target;
        if(name === "profilePicture") {
            setSignupValues({
                ...signupValues,
                [name] : files[0]
            })
        } else {
            if(name === "confirmPassword") {
                cPass.current = value;
            } else {
                setSignupValues({
                    ...signupValues,
                    [name] : value
                })
            }
        }
    } 
    let navigate = useNavigate();
    const handleSubmitData = async(e) => {

        e.preventDefault();
        
        const formData = new FormData();
        
       Object.entries(signupValues).forEach(([key, value]) => {
            if(cPass.current === signupValues.password) {
                formData.append(key, value);
            }
        });

        if(cPass.current === signupValues.password) {
            
            let signupResponse = await loginApis.signupAccount('signup',formData);
            if(signupResponse.response) {
                navigate(`/user/${signupValues.email}`)
            } 
        }
    }

    const handleLoginData = (e) => {
        let {value,name} = e.target;

        setLoginValues({
            ...loginValues,
            [name] : value
        })
    }


    const handleLogin = async(e) => {
        e.preventDefault();

        let loginResponse = await loginApis.userAccountLogin('login',loginValues);
        console.log(loginResponse)
        
    }
    

    return (
        <>
            <center>
                <div className=" space-y-6 mt-8">
                    <div className=" w-[30rem] h-20 bg-white rounded-lg p-4">
                        <h1 className="text-3xl font-normal text-gray-600">Talk-A-Tive</h1>
                    </div>
                    <div className="w-[30rem] bg-white rounded-lg pt-8">
                        <div>
                            <div className=" flex space-x-12 ml-6 mr-6">
                                <h1 className="text-base w-48 p-1 rounded-2xl bg-blue-200 cursor-pointer" id="login" onClick={handleSwitching} ref={loginRef}>Login</h1>
                                <h1 className="text-base w-48 p-1 rounded-2xl cursor-pointer" id="signup" onClick={handleSwitching} ref={signupRef}>Sign Up</h1>
                            </div>
                            <div className="flex">

                                {
                                    switcher ?
                                        <form className="ml-6 mr-6 mt-8 space-y-3">
                                            <h1 className="text-sm font-semibold flex">Email Address <span className="text-red-600">*</span></h1>
                                            <input type="email" className="w-[26rem]  text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="name@example.com" name="username" onChange={handleLoginData}/>
                                            <h1 className="text-sm font-semibold flex">Password <span className="text-red-600">*</span></h1>
                                            <input type="password" ref={loginPasswordRef} className="w-[26rem] text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="Enter Password" name="password" onChange={handleLoginData} />
                                            <div>
                                                <button type="button" ref={loginPasswordBtnRef} onClick={displayPassword} className="text-center absolute text-xs w-12 h-6 font-semibold mt-[-2.8rem] ml-[9.5rem] p-1 rounded-md bg-gray-100">Show</button>
                                            </div>
                                            <div>
                                                <button type="button" className="w-[26rem] text-center mt-6 mb-4 text-white h-10 rounded-md hover:bg-blue-500 bg-blue-400" onClick={handleLogin}>Login</button>
                                            </div>
                                        </form> 
                                        :
                                        <form className="ml-6 mr-6 mt-8 space-y-3">
                                            <h1 className="text-sm font-semibold flex">Name <span className="text-red-600">*</span></h1>
                                            <input type="text" className="w-[26rem]  text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="Enter Your Name" name="username" onChange={handleFormData}/>

                                            <h1 className="text-sm font-semibold flex">Email Address <span className="text-red-600">*</span></h1>
                                            <input type="email" className="w-[26rem]  text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="name@example.com" name="email" onChange={handleFormData}/>

                                            <h1 className="text-sm font-semibold flex">Password <span className="text-red-600">*</span></h1>
                                            <input type="password" ref={showPasswordLoginRef} className="w-[26rem] text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="Enter Password" name="password" onChange={handleFormData}/>

                                            <div>
                                                <button type="button" className="text-center absolute text-xs w-12 h-6 font-semibold mt-[-2.8rem] ml-[9.5rem] p-1 rounded-md bg-gray-100" onClick={showPassword}  ref={showPasswordBtnRef}>Show</button>
                                            </div>
                                            <h1 className="text-sm font-semibold flex">Confirm Password <span className="text-red-600">*</span></h1>
                                            <input type="password" ref={showConfirmPasswordLoginRef} className="w-[26rem] text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" placeholder="Confirm Password" onChange={handleFormData} name="confirmPassword"/>
                                            <div>
                                                <button type="button" className="text-center absolute text-xs w-12 h-6 font-semibold mt-[-2.8rem] ml-[9.5rem] p-1 rounded-md bg-gray-100" onClick={showConfirmPassword} ref={showConfirmPasswordBtnRef}>Show</button>
                                            </div>
                                            <h1 className="text-sm font-semibold flex">Upload Your Picture <span className="text-red-600">*</span></h1>
                                            <input type="File" className="w-[26rem] text-sm h-10 pb-1 rounded-md pl-3 border focus:outline-none" name="profilePicture" onChange={handleFormData}/>

                                            <div>
                                                <button type="button" onClick={handleSubmitData} className="w-[26rem] text-center mt-3 mb-3 text-white h-10 rounded-md hover:bg-blue-500 bg-blue-400">Sign Up</button>
                                            </div>
                                        </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}