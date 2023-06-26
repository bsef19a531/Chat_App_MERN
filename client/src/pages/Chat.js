import React from 'react'
import { ChatState } from '../context/chatProvider';
import NavBar from '../components/NavBar';
import { Flex, Box } from '@chakra-ui/react';
import MyChats from '../components/MyChats/MyChats';
import ChatBox from '../components/ChatBox/ChatBox';

const Chat = () => {
    const { user } = ChatState();
    return (
        <Flex flexDirection="column" h="100vh" w='100%'>
            <NavBar />

            <Flex flex="1">
                <MyChats />
                <ChatBox />
            </Flex>
        </Flex>
    )
}

export default Chat