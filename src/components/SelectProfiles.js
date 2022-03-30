import { AddIcon } from '@chakra-ui/icons';
import { Box, Container, Heading, HStack, Stack, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import CreateProfileButton from './CreateProfileButton';
import ProfileFigure from './ProfileFigure';

//Profiles View

export const Profiles = ({ user = {} }) => {
    // ChakraUI
    const toast = useToast();
    // State
    const [profiles, setProfiles] = useState([]);    // Array to save the profiles


    /**
     * Get the profiles for an user
     * @param {number} userCode 
     */
    const fetchProfiles = async (userCode) => {
        const res = await fetch(`http://localhost:8080/api/users/${userCode}/profiles`);
        const data = await res.json();
        return data
    }

    /**
     * Creates a profile
     */
    const createProfile = async (name) => {
        const URL = `http://localhost:8080/api/users/${user.userCode}/profiles`;

        let Data = {
            name
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
                    toast({
                        title: 'Has creado un perfil',
                        position: 'top',
                        status: 'success',
                        isClosable: true,
                    });
                    getProfiles();
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

    const getProfiles = async () => {
        const profilesFromServer = await fetchProfiles(user.userCode);
        if (profilesFromServer.ok === true) {
            setProfiles(profilesFromServer.profiles);
        }
    }

    useEffect(() => {
        if (Object.values(user).length === 0) {
            toast({
                title: 'No has iniciado sesión',
                position: 'top',
                status: 'error',
                isClosable: true,
            })
            return;
        }
        getProfiles();
    }, []);

    return (
        <Container textAlign="center">
            <VStack spacing="24px" padding="24px">
                <Heading textAlign="center" color={colors.primaryvariant1}>Que bueno verte de nuevo</Heading>
                <Text color={colors.secondary}>Selecciona un perfil</Text>
            </VStack>
            <HStack spacing="24px" marginTop="42px" justifyContent="center">
                {profiles.map(profile => {
                    return <ProfileFigure key={profile.profileCode} name={profile.name}></ProfileFigure>
                })}
                {Object.values(user).length !== 0 && profiles.length < 8 ? <CreateProfileButton onProfileCreated={createProfile} /> : ''}



            </HStack>

        </Container >
    );
}