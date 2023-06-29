import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
    Flex,
    Box,
    Avatar
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import UserCard from './ChatCard'

import { useDisclosure } from '@chakra-ui/react'

const ProfileGroupModal = ({ chat, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(user);

    return (
        <>
            {children ? (<span onClick={onOpen} >{children}</span>) :
                (<Button onClick={onOpen} >View</Button>
                )}

            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered motionPreset='slideInRight'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg='teal.500'>
                        <Text color='white' size='lg'>
                            Group Info
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />

                    <Box bg='linear-gradient(247deg, rgba(35,191,131,1) 0%, rgba(102,159,242,1) 99%);' w='100%' h='100px' position='relative' top='0px'></Box>

                    <ModalBody maxH='420px' >
                        <Flex flexDirection='column' justifyContent='center' alignItems='center' position='relative' top='-85px' >

                            {/* <Avatar position='relative' top='-80px' borderRadius='full' border='1px black solid' boxSize='150px' name={chat.chatName} alt={chat.chatName} />

                            <Text position='relative' top='-65px' fontFamily='Open Sans' fontSize='4xl'>
                                {chat.chatName}
                            </Text>

                            <Box bg='#EAF0F7' p='10px' m='10px' w='100%'>
                                <Text fontFamily='Open Sans' fontSize='xl'>
                                    Members
                                </Text>
                            </Box> */}

                            <Avatar borderRadius='full' border='1px black solid' boxSize='150px' name={chat.chatName} alt={chat.chatName} />

                            <Text fontFamily='Open Sans' fontSize='4xl'>
                                {chat.chatName}
                            </Text>

                            <Box bg='#EAF0F7' m='10px' w='100%'>
                                <Text fontFamily='Open Sans' fontSize='xl' bg='#23BF83' p='10px' color='white'>
                                    Admin
                                </Text>
                                <UserCard
                                    name={chat.groupAdmin.name}
                                    pic={chat.groupAdmin.profilePic}
                                    bg='#EAF0F7'
                                    color='black'
                                />
                                <Divider orientation='horizontal' />
                                <Text fontFamily='Open Sans' fontSize='xl' bg='#23BF83' p='10px' color='white'>
                                    Members
                                </Text>
                                <Box maxH='125px' overflowY='scroll'>
                                    {chat.users.filter((user) => {
                                        return user._id !== chat.groupAdmin._id
                                    }).map((user) => {
                                        return (
                                            <UserCard
                                                name={user.name}
                                                pic={user.profilePic}
                                                bg='#EAF0F7'
                                                color='black'
                                            />
                                        )
                                    }
                                    )}
                                </Box>
                            </Box>
                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button bg='#669FF2' color="white" _hover={{ bg: '#23BF83' }} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ProfileGroupModal