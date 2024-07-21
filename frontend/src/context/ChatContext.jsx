import React,{createContext,useContext,useState} from "react";

let chatContext = createContext(null);

export const useUserProfile = () => {
    let userChatContext = useContext(chatContext);
    return userChatContext;
}

export const ChatProvider = ({children}) => {
    let [userProfile,setUserProfile] = useState({});
    let [searchUser,setSearchUser] = useState([]);
    let [myChats,setMyChats] = useState([]);
    let [groupChatChanger,setGroupChatChanger] = useState(false);
    let [boolean,setBoolean] = useState(false);

    let [renderRealTimeChat,setRenderRealTimeChat] = useState(false); 
    let [liveChatting,setLiveChatting] = useState([]);
    let [refreshChats,setRefreshChats] = useState(false);

    let [groupChatName,setGroupChatName] = useState([]);
   
    return (
        <chatContext.Provider value={{userProfile , setUserProfile , searchUser ,setSearchUser , myChats , setMyChats , setBoolean ,boolean ,setLiveChatting,
        liveChatting , renderRealTimeChat , setRenderRealTimeChat , groupChatChanger , setGroupChatChanger , setRefreshChats , refreshChats , groupChatName , setGroupChatName }}>
        {children}
        </chatContext.Provider>
    );
} 