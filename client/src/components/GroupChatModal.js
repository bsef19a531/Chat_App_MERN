import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input,
    Stack,
    Box
} from '@chakra-ui/react'
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { useDisclosure, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from '../context/chatProvider'
import ChatCard from './ChatCard';
import UserBadge from './UserBadge';

const GroupChatModal = ({ children }) => {

    const { user, chat, setChat } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const toast = useToast();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            setSearchResults([]);
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.get(`http://127.0.0.1:3030/api/v1/users?search=${search}`, config);
            const { data } = response;
            setSearchResults(data);
            setLoading(false);

        }
        catch (error) {
            toast({
                title: "Error",
                description: "Unable to Search for User to add to Group Chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            setLoading(false);
        }

    }

    const HandleAddUser = (user) => {

        if (selectedUsers.includes(user)) {
            toast({
                title: "User Already Added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
        // console.log('selectedUsers from HandleCreateGroup GroupChatModal.js');
        // console.log(selectedUsers);

    }

    const HandleCreateGroup = async () => {
        console.log('HandleCreateGroup GroupChatModal.js');
        console.log(user);
        if (!groupChatName) {
            toast({
                title: "Please Fill in Group Name",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            return;
        }
        if (!selectedUsers) {
            toast({
                title: "Please Add Users to Group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            return;
        }
        if (selectedUsers.length < 2) {
            toast({
                title: "Add alteast 2 users to create a group chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const response = await axios.post(`http://127.0.0.1:3030/api/v1/chats/group`, { name: groupChatName, users: JSON.stringify(selectedUsers.map(u => u._id)) }, config);

            const { data } = response;
            setChat([data, ...chat]);
            onClose();
            toast({
                title: "New Group Chat Created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Unable to Create Group Chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }

    }



    const handleDelete = (user) => {
        setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser._id !== user._id));
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display='flex' justifyContent='center' flexDir='column' bg='#23BF83' color='white'>Create Group Chat </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        justifyContent='center'
                    >
                        <FormControl onChange={(e) => { setGroupChatName(e.target.value) }}>
                            <Input placeholder='Group Name' mb={3} />
                        </FormControl>

                        <FormControl onChange={(e) => handleSearch(e.target.value)}>
                            <Input placeholder='Search User to Add...' mb={3} />
                        </FormControl>
                        <Box display='flex' flexWrap='wrap'>
                            {selectedUsers.map((user) => {
                                return (
                                    <UserBadge
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => { handleDelete(user) }}
                                    />
                                )
                            })}

                        </Box>
                        {loading ? <ChatLoading /> : (
                            <Stack maxH='320px' overflowY='scroll'>
                                {searchResults.map((user) => (
                                    <ChatCard
                                        key={user._id}
                                        bg='white'
                                        color='black'
                                        name={user.name}
                                        pic={user.pic}
                                        _hover={{ bg: '#23BF83' }}
                                        handleFunction={() => HandleAddUser(user)}
                                    />


                                ))}
                            </Stack>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button bg='#669FF2' color="white" _hover={{ bg: '#23BF83' }} mr={3} onClick={HandleCreateGroup}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal