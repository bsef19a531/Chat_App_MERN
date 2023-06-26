import React from 'react'
import { Stack, Skeleton } from '@chakra-ui/react'

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
            <Skeleton startColor='#669FF2' endColor='#23BF83' height='45px' opacity={0.3} />
        </Stack>
    )
}

export default ChatLoading