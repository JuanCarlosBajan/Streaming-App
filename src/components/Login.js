import React, { useState } from 'react'
import InputInfo from './InputInfo'
import { Heading, Button, useToast } from '@chakra-ui/react'

// Login View

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let info


    const colors = {
        primary: '#5E2BFF',
        primaryvariant1: '#531FFF',
        primaryvariant2: '#3400E0',
        secondary: '#0E131F',
        white: '#FFFF',
        gradient: 'linear-gradient(135deg, rgba(33,0,143,1) 0%, rgba(94,43,255,0.6811099439775911) 100%)',
    }

    const styles = {
        outerContainer: {
            width: '500px',
            height: '500px',
            borderRadius: '30px',
            padding: '30px',
            backgroundColor: colors.white,
            display: 'flex',
            alignItems: 'center',
        },
        innerContainer: {
            padding: '10px',
        },
        provisionalBackgorund: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors.gradient,
        },
        title: {
            color: colors.primary,
            textAlign: 'center',
            padding: '10px',
        },
        button: {
            backgroundColor: colors.primary,
            transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
            color: colors.white,
            width: '100%',
        },
        titleContainer: {
            width: '100%',
            marginBottom: '20px',
        },
        infoContainer: {
            width: '100%',
            height: 'auto',
        }
    };

    const returnEmail = (data) => {
        setEmail(data)
    }
    const returnPassword = (data) => {
        setPassword(data)
    }

    const toast = useToast()

    const getUsers = () => {
        const URL = 'http://localhost:8080/api/users';
        const otherPram = {
            method: "GET"
        }
        fetch(URL, otherPram)
            .then(response => console.log(response.json()))
            .then(error => { console.log(error); })
    }

    const postUser = () => {
        const URL = 'http://localhost:8080/api/auth/login';

        let Data = {
            email: email,
            password: password
        };

        const otherPram = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Data),
        }

        fetch(URL, otherPram)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    info = data.user[0]
                    toast({
                        title: 'Has ingresado con éxito ' + data.user[0]['user'],
                        position: 'top',
                        status: 'success',
                        isClosable: true,
                    })
                } else {
                    data.errors.forEach(element => {
                        toast({
                            title: element,
                            position: 'top',
                            status: 'error',
                            isClosable: true,
                        })
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    return (
        <div style={styles.provisionalBackgorund}>
            <div style={styles.outerContainer}>
                <div style={styles.infoContainer}>
                    <div style={styles.titleContainer}>
                        <Heading style={styles.title}>Login</Heading>
                    </div>
                    <InputInfo fun={returnEmail} title='Correo' type='email' />
                    <InputInfo fun={returnPassword} title='Contraseña' type='password' />
                    <div style={styles.innerContainer}>
                        <Button
                            onClick={postUser}
                            backgroundColor={colors.primary}
                            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                            color={colors.white}
                            width='100%'
                            marginTop='10px'
                            _hover={{ bg: colors.primaryvariant1 }}
                            _active={{
                                bg: colors.primaryvariant2,
                                transform: 'scale(0.98)',
                                borderColor: colors.primaryvariant2,
                            }}
                            _focus={{
                                boxShadow:
                                    '0 0 1px 2px transparent, 0 1px 1px rgba(0, 0, 0, .15)',
                            }}
                        >
                            Entrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
