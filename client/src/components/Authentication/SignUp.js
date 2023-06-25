import React from 'react';
import { Grid, GridItem, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const imageUpload = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'No Image Selected',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        console.log(pic);

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'Inbox-Chat-App');
            data.append('cloud_name', 'mohammad-abdullah');
            fetch('https://api.cloudinary.com/v1_1/mohammad-abdullah/image/upload', {
                method: 'post',
                body: data
            }).then(res => res.json())
                .then(data => {
                    setPic(data.url);
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                }
                )
        } else {
            toast({
                title: 'Invalid File Type',
                position: 'top',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    const submitHandler = async () => {
        setLoading(true);
        // console.log(name, email, password, confirmPassword, pic);

        if (name === '') {
            toast({
                title: 'Please Fill your Name',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            return;
        }

        if (email === '') {
            toast({
                title: 'Please Fill Email',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            return;
        }

        if (password === '') {
            toast({
                title: 'Please Fill Password',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            return;
        }

        if (confirmPassword === '') {
            toast({
                title: 'Please Re-Enter Password in Confirm Password Field',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Password Does Not Match',
                position: 'top',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'

                }
            }
            const { data } = await axios.post('http://localhost:3030/api/v1/users', { name, email, password, pic }, config);
            console.log(data);
            toast({
                title: 'User Registered Successfully',
                position: 'top',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        }
        catch (err) {
            toast({
                title: 'Error occured while registering user, Try Again',
                description: err.response.data.message,
                position: 'top',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);

        }

    }



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
                        <Input placeholder="Enter Password" type={show ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} variant='flushed' />
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
                        <Input placeholder="ReEnter Password" type={show ? "text" : "password"} onChange={(e) => { setConfirmPassword(e.target.value) }} variant='flushed' />
                        <InputRightElement>
                            <Button bg='#e1e7eb' h='1.75em' size='sm' onClick={() => { setShow(!show) }}>
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <FormControl>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input
                        type='file'
                        p={1.5}
                        accept='image/png, image/jpeg'
                        onChange={(e) => { imageUpload(e.target.files[0]) }} />
                </FormControl>
            </GridItem>

            <GridItem rowSpan={1}>
                <Button bg='#23BF83' color='white' variant='solid' w='100%'
                    _hover={{ bg: '#669FF2', color: 'white' }}
                    _active={{ bg: '#669FF2', color: 'white' }}
                    onClick={submitHandler}
                    isLoading={loading}
                >SignUp</Button>
            </GridItem>
        </Grid>
    )
}


export default SignUp