import React from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react'
import { BiPencil, BiTrash } from "react-icons/bi";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import ModificationForm from "./ModificationForm"


const TableComponent = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const colors = {
        primary: '#5E2BFF',
        primaryvariant1: '#531FFF',
        primaryvariant2: '#3400E0',
        secondary: '#0E131F',
        white: '#FFFF',
        gradient: 'linear-gradient(135deg, rgba(33,0,143,1) 0%, rgba(94,43,255,0.6811099439775911) 100%)',
        soft: '#d9cbf9'
    }

    return (
        
        <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th> Pelicula </Th>
                            <Th> Estudio </Th>
                            <Th> Fecha de publicacion </Th>
                            <Th> Genero </Th>
                            <Th> Nombre(s) director </Th>
                            <Th> Apellidos director </Th>
                            <Th> Descripcion </Th>
                            <Th> Link para imagen </Th>
                            <Th> Categoria </Th>
                            <Th>  </Th>
                            <Th>  </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td> Amazing Spiderman </Td>
                            <Td>Walt Disney Pictures</Td>
                            <Td> 2010-10-10T06:00:00.000Z </Td>
                            <Td> Action </Td>
                            <Td> Unkrich </Td>
                            <Td> Lee </Td>
                            <Td> test </Td>
                            <Td> https://es.web.img3.acsta.net/medias/nmedia/18/84/50/16/20084857.jpg </Td>
                            <Td> pg </Td>
                            <Td>  
                                <BiPencil onClick={onOpen}/>  
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                    <ModalHeader>Modificar Pelicula</ModalHeader>
                                    <ModalCloseButton /> 
                                    <ModalBody>
                                        <ModificationForm />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color= {colors.primary}>Modificar</Button>
                                    </ModalFooter>
                                    </ModalContent>
                                </Modal>

                            </Td>
                            <Td>  
                                <BiTrash onClick={() => {console.log('borrando ...')}}/> 
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
    )
}

export default TableComponent;