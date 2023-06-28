import React from 'react'
import { Box, Avatar, Text, Flex, IconButton } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const UserCard = ({ name, pic, bg, color, handleFunction }) => {
    return (
        <>
            <Box bg={bg} m='1px' border='solid 1px #669FF2' borderRadius='lg' color={color} cursor='pointer' _hover={{ bg: '#EAF0F7' }} onClick={handleFunction}>
                <Flex alignItems='center' justifyContent='space-between' p='10px 15px' borderBottom='1px solid #EAF0F7'>
                    <Flex alignItems='center'>
                        <Avatar size='sm' name={name} src={pic} />
                        <Box>
                            <Text ml='10px' fontSize='md' fontWeight='bold'>{name}</Text>
                            <Text ml='10px' fontSize='10px' color='gray.500'>placeholder</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        color='#23BF83'
                        bg='transparent'
                        aria-label='chat'
                        size='lg'
                        icon={<ChevronRightIcon />}
                        _hover={{ bg: 'transparent' }}
                    />
                </Flex>
            </Box>
        </>
    )
}

export default UserCard