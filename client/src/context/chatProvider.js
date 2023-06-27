import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ChatContext = createContext();


const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState();
    const [chat, setChat] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo) {
            setUser(userInfo);
        }
        else {
            <Redirect to='/' />
        }

        // if (!userInfo) {
        //     history.push('/');
        // }

    }, [history]);

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chat, setChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {
    return useContext(ChatContext);
}



export default ChatProvider;