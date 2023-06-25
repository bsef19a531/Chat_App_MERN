import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Tooltip,
} from '@chakra-ui/react'

import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'


const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const searchField = React.useRef()

    return (
        <>
            <Tooltip hasArrow bg='#669FF2' label='Search for People to Chat with' aria-label='Search' fontSize='md'>
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

                    <DrawerBody>
                        <Input ref={searchField} placeholder='Search here...' />
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer