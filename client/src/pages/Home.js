import React, { useEffect } from 'react'
import { Container, Box, Image, Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import { useHistory } from 'react-router-dom';

const Home = () => {

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            history.push('/chats');
        }
    }, [history]);


    return (
        <Container maxW='xl' centerContent>
            <Box display='flex' p={3} w='100%' m='20px 0px 15px 0px' justifyContent='center'>
                <Image src='inbox-logo.png' alt='Inbox-logo' textAlign='center' height='85px' />
                {/* <Text textAlign='center' color='#1C1B2C' fontSize='5xl' fontWeight='bold' fontFamily='Montserrat Subrayada'>InBox</Text> */}
            </Box>

            <Box bg='#e1e7eb' w='100%' p={4} borderRadius='lg' borderWidth='1px' borderColor='#1C1B2C' opacity={0.87} color='black' mb='15px' >


                {/* linear-gradient(55deg, rgba(35,191,131,1) 0%, rgba(102,159,242,1) 99%); */}

                <Tabs fontFamily='Open Sans'>
                    <TabList mb='1em'>
                        <Tab _selected={{ color: 'white', bg: '#23BF83' }} w='50%' borderRadius='lg'>Login</Tab>
                        <Tab _selected={{ color: 'white', bg: '#669FF2' }} w='50%' borderRadius='lg'>SignUp</Tab>
                    </TabList>

                    <TabPanels>

                        <TabPanel>
                            <Login />
                        </TabPanel>

                        <TabPanel>
                            <SignUp />
                        </TabPanel>

                    </TabPanels>
                </Tabs>

            </Box>
        </Container >
    )
}

export default Home