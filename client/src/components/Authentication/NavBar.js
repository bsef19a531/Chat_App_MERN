import React from 'react'
import { Box } from '@chakra-ui/react';
import SideDrawer from './SideDrawer';

const NavBar = () => {


    return (
        <Box bg='#EAF0F7' w='100%' h='60px' p={4} display="flex" justifyContent="space-between" alignItems="center" position="sticky" top={0} zIndex="sticky" mb='5px' >
            <SideDrawer />
        </Box>
    )
}

export default NavBar