import React from 'react'
import { Box, Avatar, Text, Flex, IconButton } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const UserCard = ({ handleFunction, name, email, pic }) => {
    return (
        <>
            <Box _hover={{ bg: '#d2faeb' }} bg='#EAF0F7' mb={1} border='solid 1px #669FF2' borderRadius='lg'>
                <Flex alignItems='center' justifyContent='space-between' p='10px 15px' borderBottom='1px solid #EAF0F7'>
                    <Flex alignItems='center'>
                        <Avatar size='sm' name={name} src={pic} />
                        <Box>
                            <Text ml='10px' fontSize='md' fontWeight='bold'>{name}</Text>
                            <Text ml='10px' fontSize='10px' color='gray.500'>{email}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        color='#23BF83'
                        bg='transparent'
                        aria-label='chat'
                        size='lg'
                        icon={<ChatIcon />}
                        _hover={{ bg: 'transparent' }}
                    />
                </Flex>
            </Box>
        </>
    )
}

export default UserCard