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
    Text,
    Flex,
    Box,
    Avatar,
    Stack,
    Input,
    InputGroup,
    IconButton,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
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

            <Modal size='full' isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered motionPreset='slideInRight'>
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

                            <Avatar borderRadius='full' border='1px black solid' boxSize='150px' name={chat.chatName} alt={chat.chatName} />

                            <Text fontFamily='Open Sans' fontSize='4xl'>
                                {chat.chatName}
                            </Text>

                            <Stack direction='row' h='100%' width='100%'>
                                <Box bg='#EAF0F7' m='10px' w='50%' maxH='300px'>
                                    <Text fontFamily='Open Sans' fontSize='xl' bg='#23BF83' borderRadius='lg' borderBottomRadius='none' p='10px' color='white'>
                                        Members
                                    </Text>

                                    <Box overflowY='scroll' maxHeight='100%'>
                                        <UserCard
                                            key={chat.groupAdmin._id}
                                            name={chat.groupAdmin.name}
                                            pic={chat.groupAdmin.profilePic}
                                            bg='#EAF0F7'
                                            color='black'
                                            subText='Admin'
                                        />
                                        {chat.users.filter((user) => {
                                            return user._id !== chat.groupAdmin._id
                                        }).map((user) => {
                                            return (
                                                <UserCard
                                                    key={user._id}
                                                    name={user.name}
                                                    pic={user.profilePic}
                                                    bg='#EAF0F7'
                                                    color='black'
                                                    subText='Member'
                                                />
                                            )
                                        }
                                        )}
                                    </Box>
                                </Box>
                                <Box width='50%'>
                                    <FormControl>
                                        <InputGroup bg='white' p='10px 0px' >
                                            <Input placeholder='Change Group Name' onChange={(e) => { }} borderRightRadius='0px' />

                                            <IconButton
                                                bg='#23BF83'
                                                aria-label='Search database'
                                                icon={<CheckIcon />}
                                                color='white'
                                                _hover={{ bg: '#669FF2' }}
                                                _selected={{ bg: '#669FF2' }}
                                                _active={{ bg: '#669FF2' }}
                                                onClick={() => { }}
                                                borderLeftRadius='0px'
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>
                            </Stack>

                        </Flex>


                    </ModalBody>

                    <ModalFooter>
                        <Button bg='red' color="white" _hover={{ bg: 'red' }} mr={3} onClick={() => { }}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ProfileGroupModal