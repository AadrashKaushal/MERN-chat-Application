import React,{createContext,useContext,useState} from "react";

let chatContext = createContext(null);

export const useUserProfile = () => {
    let userChatContext = useContext(chatContext);
    return userChatContext;
}

export const ChatProvider = ({children}) => {
    let [userProfile,setUserProfile] = useState({});
    return (
        <chatContext.Provider value={{userProfile , setUserProfile}}>
        {children}
        </chatContext.Provider>
    );
} 