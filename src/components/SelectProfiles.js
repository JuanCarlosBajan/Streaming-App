import { Box, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { colors } from '../utils/colors';
import ProfileFigure from './ProfileFigure';

//Profiles View

export const Profiles = () => {

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



    const getUsers = () => {
        const URL = 'http://localhost:8080/api/users';
        const otherPram = {
            method: "GET"
        }
        fetch(URL, otherPram)
            .then(response => console.log(response.json()))
            .then(error => { console.log(error); })
    }

    /**
     * Get the profiles for an user
     * @param {number} userCode 
     */
    const getProfiles = (userCode) => {

    }

    return (
        <Container textAlign="center">
            <VStack spacing="24px" padding="24px">
                <Heading textAlign="center">Que bueno verte de nuevo</Heading>
                <Text>Selecciona un perfil</Text>
            </VStack>
            <HStack spacing="24px" marginTop="42px" justifyContent="center">
                <ProfileFigure></ProfileFigure>
            </HStack>
        </Container >
    );
}