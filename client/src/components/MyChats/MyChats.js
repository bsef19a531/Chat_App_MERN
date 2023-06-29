import React, { useEffect } from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box, useToast, Text, Button, Stack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import ChatCard from '../ChatCard';
import GroupChatModal from '../GroupChatModal';

const MyChats = ({ fetchAgain }) => {

    const { user, setChat, selectedChat, setSelectedChat, chat } = ChatState();
    const [loggedUser, setLoggedUser] = useState({});
    const toast = useToast();

    const fetchChats = async () => {
        // console.log(user);
        // console.log(user.token);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.get('http://127.0.0.1:3030/api/v1/chats', config);
            const { data } = response;
            setChat(data);
            // console.log(data);
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }

    const getSender = (loggedUser, users) => {
        // console.log("From getSender");
        // console.log("users");
        // console.log(users);
        // console.log("loggedUser");
        // console.log(loggedUser);
        if (users && users.length > 0) {
            const sender = users[0]._id === loggedUser._id ? users[1].name : users[0].name;
            // console.log("sender");
            // console.log(sender);
            return sender;
        }
        return '';
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
        fetchChats();
    }, [fetchAgain])

    // console.log("From MyChats.js")
    // console.log(SelectedChat)
    // console.log(chat)

    const handleChatSelect = (chatItem) => {
        setSelectedChat(chatItem);


        console.log("From handleChat Select MyChats.js")
        console.log(chatItem)
        console.log(selectedChat)
    }

    return (
        <Box
            borderRadius='lg'
            w={{ base: '100%', md: '33.3%' }}
            h='96%'
            m='10px 7px 8px 8px'
            display={{ base: !selectedChat ? 'flex' : 'none', md: 'block' }}
            flexDir='column'
            alignItems='center'
            bg='rgba(234, 240, 247, 0.7)'
        >
            <Box
                display='flex'
                py={3}
                px={3}
                fontSize={{ base: '20px', md: '24px' }}
                justifyContent='space-between'
                alignItems='center'
                w='100%'
                bg='#23BF83'
                borderRadius='lg'
                borderBottomRadius='none'
                opacity={1.0}
            >
                <Text color='white'>My Chats</Text>
                <GroupChatModal >
                    <Button rightIcon={<AddIcon />}
                        bg='#23BF83'
                        _hover={{ bg: '#23BF83' }}
                        variant='outline'
                        color='white'
                        fontSize={{ base: '10px', md: '10px', lg: '15px' }}
                    >
                        Create Group

                    </Button>
                </GroupChatModal>

            </Box>

            {
                chat ? (
                    <Stack spacing='1px' w='100%' overflowY='scroll' h='75vh'>

                        {chat.map((chatItem) => {
                            console.log("From MyChats.js")
                            console.log(chatItem)
                            console.log(selectedChat)

                            return (
                                // <Box
                                //     onClick={() => setSelectedChat(chatItem)}
                                //     key={chatItem._id}
                                //     bg={SelectedChat === chatItem ? '#23BF83' : 'white'}
                                //     color={SelectedChat === chatItem ? 'white' : 'black'}
                                //     cursor='pointer'
                                //     w='100%'
                                // >
                                //     <Text>{!chatItem.isGroup ? getSender(loggedUser, chatItem.users) : chat.chatName}</Text>


                                // </Box>)
                                < ChatCard
                                    key={chatItem._id}
                                    name={!chatItem.isGroupChat ? getSender(loggedUser, chatItem.users) : chatItem.chatName
                                    }
                                    pic={chatItem.isGroupChat ? chatItem.chatImage : chatItem.users[0].pic}
                                    bg={selectedChat === chatItem ? '#23BF83' : 'white'}
                                    color={selectedChat === chatItem ? 'white' : 'black'}
                                    cursor='pointer'
                                    handleFunction={(e) => { handleChatSelect(chatItem) }}
                                />)
                        })}
                    </Stack>

                ) : (<ChatLoading />)
            }


        </Box>

    )
}


export default MyChats