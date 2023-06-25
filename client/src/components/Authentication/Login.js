import React from 'react'
import { Grid, GridItem, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const loginHandler = () => { }

    return (
        <Grid w='100%' templateRows='repeat(2, 1fr)' gap={4}>


            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input focusBorderColor='#23BF83' placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} variant='flushed' />
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input focusBorderColor='#23BF83' type={show ? "text" : "password"} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} variant='flushed' />
                        <InputRightElement>
                            <Button bg='#e1e7eb' h='1.75em' size='sm' onClick={() => { setShow(!show) }}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <Button bg='#669FF2' color='white' variant='solid' w='100%'
                    _hover={{ bg: '#23BF83', color: 'white' }}
                    _active={{ bg: '#23BF83', color: 'white' }}
                    onClick={loginHandler}
                >Login</Button>
            </GridItem>
        </Grid>
    )
}

export default Login    