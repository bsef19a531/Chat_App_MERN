import React from 'react'
import { Avatar, Box, Image } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
} from '@chakra-ui/react';
import SideDrawer from './SideDrawer';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../context/chatProvider';
import ProfileModal from './ProfileModal';

const NavBar = () => {

    const { user } = ChatState();

    return (
        <Box bg='#EAF0F7' w='100%' h='60px' p={4} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0} zIndex="sticky" mb='5px' >
            <SideDrawer />
            <Image src='inbox-logo.png' alt='Inbox-Logo' height='50px' />
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize='2xl' m={1} />
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
                        <Avatar name={user.name} src={user.pic} size='sm' cursor='pointer' />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>
                                User Profile
                            </MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
    )
}

export default NavBar