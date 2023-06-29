
import React from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';


const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <Box borderRadius='lg' w={{ base: '100%', md: '66.6%' }} h='96%' m='10px 8px 8px 7px'
            display={{ base: selectedChat ? 'flex' : 'none', md: 'block' }}
            bg='rgba(234, 240, 247, 0.7)'
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box >
    )
}

export default ChatBox