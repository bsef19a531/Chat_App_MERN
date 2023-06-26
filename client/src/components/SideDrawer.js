import React from 'react'
import UserCard from './UserCard'
import ChatLoading from './ChatLoading'
import {
    Drawer,
    DrawerBody,
    // DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tooltip,
    InputGroup,
    IconButton,
    Box,
    Text,
    Toast,
    useToast
} from '@chakra-ui/react'

import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { useState, useRef } from 'react'
import { ChatState } from '../context/chatProvider'
import axios from 'axios'


const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const searchField = useRef()
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const toast = useToast();

    const { user } = ChatState();

    const handleSearch = async () => {
        if (!search) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`http://127.0.0.1:3030/api/v1/users?search=${search}`, config);
            setLoading(false);
            setSearchResults(data);
            console.log(data);
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            setLoading(false);
        }

    }

    const accessChat = async (id) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`http://1)`)
            setLoadingChat(false);
            setSearchResults(data);
            console.log(data);
        }
        catch (err) {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
            setLoadingChat(false);
        }
    }




    return (
        <>
            <Tooltip hasArrow bg='#669FF2' label='Search for People to Chat' aria-label='Search' fontSize='md'>
                <Button leftIcon={<Search2Icon />} ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    <Text display={{ base: 'none', md: 'flex' }}>
                        Search
                    </Text>
                </Button>
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                initialFocusRef={searchField}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search People</DrawerHeader>

                    <DrawerBody p='0px 8px 15px 8px' >
                        <Box position='sticky' top={0} zIndex="sticky">
                            <InputGroup bg='white' p='10px 0px' >
                                <Input ref={searchField} placeholder='Search by name or email' onChange={(e) => { setSearch(e.target.value) }} value={search} />

                                <IconButton
                                    bg='#669FF2'
                                    aria-label='Search database'
                                    icon={<SearchIcon />}
                                    color='white'
                                    _hover={{ bg: '#23BF83' }}
                                    _selected={{ bg: '#23BF83' }}
                                    _active={{ bg: '#23BF83' }}
                                    onClick={handleSearch}
                                />
                            </InputGroup>
                        </Box>

                        <Box m='8px 0px' bg='white' h='auto' w='100%' overflow='auto'>
                            {/* <UserCard name={name} pic={pic} /> */}

                            {
                                loading ?
                                    <ChatLoading /> :
                                    searchResults.length === 0 ? <Text textAlign='center' mt='20px' color='gray.500'>No Results Found</Text> :
                                        searchResults.map((user, index) => {
                                            return (
                                                <UserCard key={index} name={user.name} pic={user.pic} email={user.email}
                                                    handleFunction={() => { accessChat(user._id) }}
                                                />
                                            )
                                        })
                                // users.map((user, index) => {
                                //     return (
                                //         <UserCard key={index} name={user.name} pic={user.pic} email={user.email} />
                                //     )
                                // })

                            }
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer >
        </>
    )
}

export default SideDrawer