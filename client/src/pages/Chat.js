import React from 'react'
import { ChatState } from '../context/chatProvider';
import NavBar from '../components/Authentication/NavBar';

const Chat = () => {
    const { user } = ChatState();
    return (
        <>
            <NavBar />
        </>
    )
}

export default Chat