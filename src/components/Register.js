import React, { useState } from 'react'
import InputInfo from './InputInfo'
import InputName from './InputName'
import { Heading, Button, useToast, AbsoluteCenter } from '@chakra-ui/react'

export const Register = () => {

    const colors = {
        primary: '#5E2BFF',
        primaryvariant1: '#531FFF',
        primaryvariant2: '#3400E0',
        secondary: '#0E131F',
        white: '#FFFF',
    }

    const styles = {
        outerContainer: {
            width: '500px',
            borderRadius: '30px',
            padding: '30px',
            backgroundColor: colors.white,
            display: 'flex',
            alignItems: 'center',

            position: 'absolute',
            left: '40px',
            overflow: 'auto',
        },
        innerContainer: {
            padding: '10px',
        },
        provisionalBackgorund: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
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


    return (
        <div style={styles.provisionalBackgorund}>
            <div style={styles.outerContainer}>
                <div style={styles.infoContainer}>
                    <div style={styles.titleContainer}>
                        <Heading style={styles.title}>Sign up</Heading>
                    </div>
                    <InputName title='Nombre' type='name' />
                    <InputInfo title='Correo' type='email' />
                    <InputInfo title='Contraseña' type='password' />
                    <InputInfo title='Confirmar contraseña' type='password' />

                    <div style={styles.innerContainer}>
                        <Button
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
