import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'

const Home = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box d='flex' p={3} w='100%' m='20px 0px 15px 0px' justifyContent='center'>
                <Text textAlign='center' color='#1C1B2C' fontSize='5xl' fontWeight='bold' fontFamily='Montserrat Subrayada'>InBox</Text>
            </Box>
        </Container>
    )
}

export default Home