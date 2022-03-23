import { Box, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import ProfileFigure from './ProfileFigure';

//Profiles View

export const Profiles = () => {

    const [profiles, setProfiles] = useState([]);    // Array to save the profiles

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
    const fetchProfiles = async (userCode) => {
        const res = await fetch(`http://localhost:8080/api/users/${userCode}/profiles`);
        const data = await res.json();
        return data
    }

    useEffect(() => {

        const getProfiles = async () => {
            const profilesFromServer = await fetchProfiles(1);
            if (profilesFromServer.ok == true) {
                setProfiles(profilesFromServer.profiles);
            }
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

            </HStack>
        </Container >
    );
}