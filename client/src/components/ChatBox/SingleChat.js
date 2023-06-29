import React from 'react'
import { ChatState } from '../../context/chatProvider';
import { Box, IconButton, Text, Stack, Avatar } from '@chakra-ui/react';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import ProfileModal from '../ProfileModal';
import ProfileGroupModal from '../ProfileGroupModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

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

    return (
        <>
            {
                selectedChat ? <Box
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