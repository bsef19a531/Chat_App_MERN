import React from 'react'
import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadge = ({ user, handleFunction }) => {
    return (
        <Box
            px={2}
            py={1}
            borderRadius='lg'
            m={1}
            variant='solid'
            fontSize='sm'
            cursor='pointer'
            onClick={handleFunction}
            bg='#23BF83'
            alignItems="center"
            justifyContent="center"
            color='white'

        >
            {user.name}
            <CloseIcon fontSize='md' ml={1} p={1} variant='solid' bg='red' color='white' borderRadius='full' />
        </Box>
    )
}

export default UserBadge