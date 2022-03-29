import React, { useState } from 'react'
import InputInfo from './InputInfo'
import Inputs from './Inputs'
import { Heading, Button, useToast, AbsoluteCenter } from '@chakra-ui/react'
import './scrollBar.css'

export const Register = ({ onSuccess }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
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
            height: '495px',
            borderRadius: '30px',
            padding: '30px',
            backgroundColor: colors.white,
            overflowY: 'scroll',
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
            height: '100%',
        },
        titleContainer: {
            width: '100%',
            marginBottom: '20px',
        },
        infoContainer: {
            width: '100%',
            height: 'auto',
        },
    };


    const returnName = (data) => {
        setName(data)
    }
    const returnEmail = (data) => {
        setEmail(data)
    }
    const returnPassword = (data) => {
        setPassword(data)
    }
    const returnRepeatPassword = (data) => {
        setRepeatPassword(data)
    }
    const returnLastName = (data) => {
        setLastName(data)
    }
    const returnUserName = (data) => {
        setUserName(data)
    }



    const toast = useToast()

    const postUser = () => {
        const URL = 'http://localhost:8080/api/auth/register';

        let Data = {
            name: name,
            lastName: lastName,
            user: userName,
            email: email,
            password: password,

        };

        const otherPram = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Data),
        }

        if (name.length === 0 || email.length === 0 || password.length === 0 || repeatPassword.length === 0 || userName.length === 0 || lastName.lenght === 0) {
            toast({
                title: 'No has ingresado todos tus datos',
                position: 'top',
                status: 'error',
                isClosable: true,
            })
            return;
        }
        else if(password != repeatPassword){
            toast({
                title: 'Las contraseñas no coinciden',
                position: 'top',
                status: 'error',
                isClosable: true,
            })
            return;
        }

        fetch(URL, otherPram)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    info = data.user
                    toast({
                        title: 'Te has registrado correctamente ' + info.user,
                        position: 'top',
                        status: 'success',
                        isClosable: true,
                    });

                    onSuccess(info.user)
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
            <div style={styles.outerContainer} className='container'>
                <div style={styles.infoContainer}>
                    <div style={styles.titleContainer}>
                        <Heading style={styles.title}>Sign up</Heading>
                    </div>
                    <Inputs title='Nombre' type='name' fun={returnName} message='Ingresa tu Nombre' />
                    <Inputs title='Apellidos' type='name' fun={returnLastName} message='Ingresa tus Apellidos' />
                    <Inputs title='Nombre de usuario' type='name' fun={returnUserName} message='Ingresa tu Nombre de Usuario' />
                    <InputInfo title='Correo' type='email' fun={returnEmail}  />
                    <InputInfo title='Contraseña' type='password' fun={returnPassword}  />
                    <InputInfo title='Confirmar contraseña' type='password' fun={returnRepeatPassword}  />

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
                            Aceptar y continuar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
