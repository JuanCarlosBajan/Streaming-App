import { AddIcon } from '@chakra-ui/icons'
import { Button, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { colors } from '../utils/colors';

function CreateProfileButton({ onProfileCreated, user }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profileName, setProfileName] = useState();

    const openProfileModal = () => {
        onOpen();
    }

    const createProfile = () => {
        onClose();
        if (profileName.length > 0) {
            onProfileCreated(profileName);
        }
    }

    return (
        <>
            <VStack spacing="18px">
                <div className='profile__button' onClick={openProfileModal}>
                    <AddIcon w={10} h={10}></AddIcon>
                </div>
                <Text fontWeight="bold">Crear Perfil</Text>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crea un perfil</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel color={colors.primary}>Nombre del perfil</FormLabel>
                        <InputGroup>
                            <Input onChange={(e) => { setProfileName(e.target.value) }} focusBorderColor={colors.primary} placeholder='Ingresa un nombre' />
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue'
                            backgroundColor={colors.primary}
                            color={colors.white}
                            mr={3} onClick={createProfile}>
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateProfileButton