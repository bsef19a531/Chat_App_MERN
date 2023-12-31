import React from 'react'
import { ChatState } from '../context/chatProvider';
import NavBar from '../components/NavBar';
import { Flex, Box } from '@chakra-ui/react';
import MyChats from '../components/MyChats/MyChats';
import ChatBox from '../components/ChatBox/ChatBox';
import { useState } from 'react';

const Chat = () => {
    const { user } = ChatState();
    const { fetchAgain, setFetchAgain } = useState(false);
    return (
        <Flex flexDirection="column" h="100vh" w='100%'>
            <NavBar />

            <Flex flex="1" maxH='90%'>
                <MyChats fetchAgain={fetchAgain} />
                <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Flex>
        </Flex>
    )
}

export default Chat