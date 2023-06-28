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
} from '@chakra-ui/react'

import { useDisclosure, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from '../context/chatProvider'

const GroupChatModal = ({ children }) => {

    const { user, chat, setChat } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const toast = useToast();

    const handleSearch = async (e) => { }

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
                            <Input placeholder='Add users to Group' mb={3} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg='#669FF2' color="white" _hover={{ bg: '#23BF83' }} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal