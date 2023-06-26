import React from 'react'
import UserCard from './UserCard'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tooltip,
    InputGroup,
    IconButton,
    Box
} from '@chakra-ui/react'

import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { Search2Icon, SearchIcon } from '@chakra-ui/icons'


//Dummy Data
const users = [
    {
        name: 'John Doe',
        pic: 'https://bit.ly/dan-abramov',
        email: 'abc@example.com'
    },
    {
        name: 'Jane Doe',
        email: 'abc@example.com'
    },
    {
        name: 'John Smith',
        pic: 'https://bit.ly/dan-abramov',
        email: 'abc@example.com'
    },
    {
        name: 'Jane Smith',
        pic: 'https://bit.ly/dan-abramov'
    },
    {
        name: 'John Doe',
        email: 'abc@example.com'

    },
    {
        name: 'Jane Doe',
        pic: 'https://bit.ly/dan-abramov',
        email: 'abc@example.com'
    },
    {
        name: 'John Smith',
        pic: 'https://bit.ly/dan-abramov'
    },
    {
        name: 'Jane Smith',
        pic: 'https://bit.ly/dan-abramov'
    },
    {
        name: 'John Doe',
        email: 'abc@example.com'
    },
    {
        name: 'Jane Doe',
        pic: 'https://bit.ly/dan-abramov'
    },
    {
        name: 'John Smith',
        pic: 'https://bit.ly/dan-abramov',
        email: 'abc@example.com'
    },
    {
        name: 'Jane Smith',
        email: 'abc@example.com'
    },
]


const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const searchField = React.useRef()

    return (
        <>
            <Tooltip hasArrow bg='#669FF2' label='Search for People to Chat' aria-label='Search' fontSize='md'>
                <Button leftIcon={<Search2Icon />} ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    Search
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
                                <Input ref={searchField} placeholder='Search...' />
                                <IconButton
                                    bg='#669FF2'
                                    aria-label='Search database'
                                    icon={<SearchIcon />}
                                    color='white'
                                    _hover={{ bg: '#23BF83' }}
                                    _selected={{ bg: '#23BF83' }}
                                    _active={{ bg: '#23BF83' }}
                                />
                            </InputGroup>
                        </Box>

                        <Box m='8px 0px' bg='white' h='auto' w='100%' overflow='auto'>
                            {/* <UserCard name={name} pic={pic} /> */}

                            {users.map((user, index) => {
                                return (
                                    <UserCard key={index} name={user.name} pic={user.pic} email={user.email} />
                                )
                            })}
                        </Box>
                    </DrawerBody>


                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer >
        </>
    )
}

export default SideDrawer