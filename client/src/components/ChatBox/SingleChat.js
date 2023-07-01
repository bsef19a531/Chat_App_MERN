import React, { useEffect } from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box, IconButton, Text, Stack, Avatar, Spinner, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import ProfileModal from '../ProfileModal';
import ProfileGroupModal from '../ProfileGroupModal';
import { useState } from 'react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import './chatStyles.css';
import ScrollableMessages from './ScrollableMessages';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [newMessage, setNewMessage] = useState('')
    const toast = useToast();

    console.log("selectedMessages", messages)

    useEffect(() => {
        fetchMessages();
    }, [selectedChat, fetchAgain]);

    const getSender = (loggedUser, users) => {

        if (users && users.length > 0) {
            const sender = users[0]._id === loggedUser._id ? users[1].name : users[0].name;
            return sender;
        }
        return '';
    };

    const getSenderObject = (loggedUser, users) => {

        if (users && users.length > 0) {
            const sender = users[0]._id === loggedUser._id ? users[1] : users[0];
            return sender;
        }
        return '';
    };

    const sendMessage = async (e) => {
        // console.log("send message")

        if ((e.key === 'Enter' || e._reactName === 'onClick') && newMessage) {
            try {

                setLoading(true);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }

                setNewMessage('');
                const { data } = await axios.post('http://127.0.0.1:3030/api/v1/messages', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);


                setMessages([...messages, data]);
                setLoading(false);
                console.log(data);
            }
            catch (err) {
                toast({
                    title: "Unable to Load Chat Messages",
                    description: "Unable to send message.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
                setLoading(false);
            }
        }
    }

    const fetchMessages = async () => {
        if (!selectedChat) { return; }
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            setLoading(true);

            const { data } = await axios.get(`http://127.0.0.1:3030/api/v1/messages/${selectedChat._id}`, config);

            setMessages(data);
            setLoading(false);
            // console.log(data);
        }
        catch (err) {
            toast({
                title: "Unable to Load Chat Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            setLoading(false);
        }
        // const { data } = await axios.get(`http://` + process.env.REACT_APP_API_URL + `/api/v1/messages/${selectedChat._id}`, config);

    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        //Typing Indicator Logic
    }

    return (
        <>
            {
                selectedChat ? <Box display='flex' w='100%' flexDirection='column' h='100%'

                > <Box
                    display='flex'
                    py={3}
                    px={3}
                    fontSize={{ base: '15px', md: '20px' }}
                    justifyContent='space-between'
                    alignItems='center'
                    w='100%'
                    bg='#23BF83'
                    borderRadius='lg'
                    borderBottomRadius='none'
                    opacity={1.0}
                    height='65px'
                >
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            aria-label="Back to chats list"
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                            bg='transparent'
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            variant='outline'
                            color='white'
                        />
                        <Stack direction='row' alignItems='center' color='white' >


                            {!selectedChat.isGroupChat ?
                                (<>
                                    <Avatar name={getSender(user, selectedChat.users)} src={getSender(user, selectedChat.users).profilePic} />
                                    <Text>
                                        {getSender(user, selectedChat.users)}
                                    </Text>
                                </>) :

                                (
                                    <>
                                        <Avatar name={selectedChat.chatName} />
                                        <Text>
                                            {selectedChat.chatName.toUpperCase()}
                                        </Text>
                                    </>
                                )
                            }
                        </Stack>

                        {
                            !selectedChat.isGroupChat ? (<ProfileModal user={getSenderObject(user, selectedChat.users)}>
                                <IconButton icon={<InfoIcon />} bg='transparent'
                                    _hover={{ bg: 'transparent' }}
                                    _active={{ bg: 'transparent' }}
                                    variant='outline'
                                    color='white' />
                            </ProfileModal>) :
                                <ProfileGroupModal chat={selectedChat}>
                                    <IconButton icon={<InfoIcon />} bg='transparent'
                                        _hover={{ bg: 'transparent' }}
                                        _active={{ bg: 'transparent' }}
                                        variant='outline'
                                        color='white'
                                    />
                                </ProfileGroupModal>
                        }

                    </Box>

                    {
                        // #EAF0F7
                        !loading ?
                            (<Box h="100%" bg='' m='2px 5px' borderRadius='lg' p='3px 5px' maxH='100%' overflowY='scroll' >
                                <ScrollableMessages messages={messages} />
                            </Box>
                            ) : (<Spinner size="xl" alignItems='center' margin='auto' />)

                    }
                    <FormControl onKeyDown={sendMessage} isRequired>
                        <InputGroup>
                            <Input variant='filled' bg='white' placeholder='Type Message...' onChange={typingHandler}
                                value={newMessage}
                            />
                            <InputRightElement cursor='pointer' onClick={sendMessage} >
                                <ArrowRightIcon color='green.500' />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                </Box > : (
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        h='100%'

                    >
                        <Text fontSize='3xl' pb={3} fontFamily='Open Sans' color='#4f4949'>
                            Select a Chat to start Messaging
                        </Text>
                    </Box>
                )
            }
        </>
    )
}

export default SingleChat