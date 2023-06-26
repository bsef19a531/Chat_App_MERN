import React from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box } from '@chakra-ui/react';

const MyChats = () => {

    const { user, setChat, SelectedChat, setSelectedChat, chat } = ChatState();

    return (
        <Box borderRadius='lg' w='33.3%' bg='gray' h='96%' m='10px 7px 8px 8px' p='20px 10px' >
            MyChats
        </Box>
    )
}

export default MyChats