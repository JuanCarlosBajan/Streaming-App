import { Container, Heading, HStack, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { createProfile, getUserProfiles } from '../../services/user';
import { colors } from '../../utils/colors';
import CreateProfileButton from '../CreateProfileButton';
import ProfileFigure from '../ProfileFigure';

//Profiles View

export const Profiles = ({ user = {} }) => {
    // ChakraUI
    const toast = useToast();
    // State
    const [profiles, setProfiles] = useState([]);    // Array to save the profiles

    /**
     * Creates a profile
     */
    const addProfile = async (name) => {

        const data = await createProfile(user.userCode, name);
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
    }

    const getProfiles = async () => {
        const profilesFromServer = await getUserProfiles(user.userCode);
        if (profilesFromServer.ok === true) {
            setProfiles(profilesFromServer.profiles);
        }
    }

    useEffect(() => {
        if (Object.values(user).length !== 0) {
            getProfiles();
        }
    });

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
                {Object.values(user).length !== 0 && profiles.length < 8 ? <CreateProfileButton onProfileCreated={addProfile} /> : ''}



            </HStack>

        </Container >
    );
}