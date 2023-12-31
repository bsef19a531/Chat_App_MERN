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
import { useHistory } from 'react-router-dom';
import ChatLoading from './ChatLoading';

const NavBar = () => {

    const history = useHistory();

    const { user } = ChatState();
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        history.push('/');
    }



    return (
        <Box bg='#EAF0F7' w='100%' h='60px' p={4} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0} zIndex="sticky" mb='5px' >
            <SideDrawer />
            <Image src='inbox-logo.png' alt='Inbox-Logo' height='50px' display={['none', 'block']} />
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize='2xl' m={1} />
                    </MenuButton>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
                        {/* <Avatar name={user.name} src={user.pic} size='sm' cursor='pointer' /> */}
                        {user && ( // Add a conditional check for user object
                            <Avatar name={user.name} src={user.pic} size="sm" cursor="pointer" />
                        )}
                    </MenuButton>
                    <MenuList>
                        {/* {user ? ( // Add a conditional check for user object
                            <ProfileModal user={user}>
                                <MenuItem>
                                    User Profile
                                </MenuItem>
                            </ProfileModal>) :
                            <ChatLoading />
                        } */}


                        <ProfileModal user={user}>
                            <MenuItem>
                                User Profile
                            </MenuItem>
                        </ProfileModal>


                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
    )
}

export default NavBar