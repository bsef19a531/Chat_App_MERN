import React from 'react'
import { ChatState } from '../context/chatProvider';
import NavBar from '../components/NavBar';

const Chat = () => {
    const { user } = ChatState();
    return (
        <>
            <NavBar />
        </>
    )
}

export default Chat