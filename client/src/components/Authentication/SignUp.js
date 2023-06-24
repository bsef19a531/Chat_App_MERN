import React from 'react';
import { Grid, GridItem, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [show, setShow] = useState(false);

    const submitHandler = () => { }

    return (
        <Grid w='100%' templateRows='repeat(2, 1fr)' gap={4}>
            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Enter Your Name" onChange={(e) => { setName(e.target.value) }} variant='flushed' />
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} variant='flushed' />
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} variant='flushed' />
                        <InputRightElement>
                            <Button bg='#e1e7eb' h='1.75em' size='sm' onClick={() => { setShow(!show) }}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input placeholder="ReEnter Password" onChange={(e) => { setConfirmPassword(e.target.value) }} variant='flushed' />
                        <InputRightElement>
                            <Button bg='#e1e7eb' h='1.75em' size='sm' onClick={() => { setShow(!show) }}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl isRequired>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input
                        type='file'
                        p={1.5}
                        accept='image/png, image/jpeg'
                        onChange={() => { }} />
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <Button bg='#23BF83' color='white' variant='solid' w='100%'
                    _hover={{ bg: '#669FF2', color: 'white' }}
                    _active={{ bg: '#669FF2', color: 'white' }}
                    onClick={submitHandler}
                >SignUp</Button>
            </GridItem>
        </Grid>
    )
}

export default SignUp