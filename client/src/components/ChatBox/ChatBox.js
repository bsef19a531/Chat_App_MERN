
import React from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box } from '@chakra-ui/react';


const ChatBox = () => {
    const { selectedChat } = ChatState();
    return (
        <Box borderRadius='lg' w={{ base: '100%', md: '66.6%' }} bg='gray' h='96%' m='10px 8px 8px 7px'
            display={{ base: selectedChat ? 'flex' : 'none', md: 'block' }}
        >
            ChatBox
        </Box >
    )
}

export default ChatBox