import React from 'react'
import { Box, Avatar, Text, Flex, IconButton } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const UserCard = (props) => {
    return (
        <>
            <Box bg='#EAF0F7' mb={1} border='solid 1px #669FF2' borderRadius='lg'>
                <Flex alignItems='center' justifyContent='space-between' p='10px 15px' borderBottom='1px solid #EAF0F7'>
                    <Flex alignItems='center'>
                        <Avatar size='sm' name={props.name} src={props.pic} />
                        <Text ml='10px' fontSize='md' fontWeight='bold'>{props.name}</Text>
                    </Flex>
                    <IconButton
                        color='#23BF83'
                        aria-label='chat'
                        size='lg'
                        icon={<ChatIcon />}
                    />
                </Flex>
            </Box>
        </>
    )
}

export default UserCard