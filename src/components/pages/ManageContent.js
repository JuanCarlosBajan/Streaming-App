import React, {useState} from 'react'
import {Table, Tbody, Tr, Td, TableContainer} from '@chakra-ui/react'
import TableHeader from "../TableHeader"
import ModificationForm from "../ModificationForm"
import { BiPencil, BiTrash } from "react-icons/bi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react'
import { Heading, useToast, FormLabel } from '@chakra-ui/react'
import InputInfo from '../InputInfo'
import Inputs from '../Inputs'



const ManageContent = () => {
    
    const [option, setOption] = useState('');
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

    const styles = {
        outerContainer: {
            width: '500px',
            height: '495px',
            borderRadius: '30px',
            padding: '30px',
            backgroundColor: colors.white,
            overflowY: 'scroll',
            border: '2px solid #5E2BFF',
        },
        innerContainer: {
            borderColor: colors.primary,
            padding: '10px',
        },
        provisionalBackgorund: {
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleContainer: {
            width: '100%',
            marginBottom: '20px',
        },
        infoContainer: {
            width: '100%',
            height: 'auto',
        },
        tableContainer: {
            padding: '40px'
        }
    };

    

    const show = () => {
        if (option === 'movie'){
            return(<TableContainer> 
            <Table variant='simple'>
                <TableHeader />
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
                            <BiPencil cursor={'pointer'} onClick={onOpen}/>  
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader>
                                    <Heading as='h4' size='md'>
                                        Añada una pelicula
                                    </Heading>
                                </ModalHeader>
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
                            <BiTrash cursor={'pointer'} onClick={() => {console.log('borrando ...')}}/> 
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>)}
        if(option === 'serie') {
            return(<TableContainer> 
            <Table variant='simple' size='md'>
                <TableHeader option={'serie'} />
                <Tbody>
                    <Tr>
                        <Td> The Big Bang Theory  </Td>
                        <Td> Walt Disney Pictures</Td>
                        <Td> 2010-10-10T06:00:00.000Z </Td>
                        <Td> Comedy </Td>
                        <Td> Unkrich </Td>
                        <Td> Lee </Td>
                        <Td> test </Td>
                        <Td> https://es.web.img3.acsta.net/medias/nmedia/18/84/50/16/20084857.jpg </Td>
                        <Td> pg </Td>
                        <Td> 279 </Td>
                        <Td> 12 </Td>
                        <Td> Infoo </Td>
                        <Td>  
                            <BiPencil cursor={'pointer'} onClick={onOpen}/>  
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader> 
                                    <Heading as='h4' size='md'>
                                        Modificar serie
                                    </Heading>
                                </ModalHeader>
                                <ModalCloseButton /> 
                                <ModalBody>
                                    <ModificationForm option={'serie'}/>
                                </ModalBody>
                                <ModalFooter>         
                                    <Button color= {colors.primary}>Modificar</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Td>
                        <Td>    
                            <BiTrash cursor={'pointer'} onClick={() => {console.log('borrando ...')}}/> 
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>)}
        if(option === 'addSerie'){
            return(
                <div style={styles.provisionalBackgorund}>
            <div style={styles.outerContainer} className='container'>
                <div style={styles.infoContainer}>
                    <div style={styles.titleContainer}>
                        <Heading as='h4' size='md'>
                            Añadir una serie
                        </Heading>
                    </div>
                   <ModificationForm option={'serie'} />

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
                            Aceptar
                        </Button>
                    </div>

                </div>
            </div>
        </div> 
        )}
        if(option === 'addMovie'){
            return(
                
                <div style={styles.provisionalBackgorund}>
            <div style={styles.outerContainer} className='container'>
                <div style={styles.infoContainer}>
                    <div style={styles.titleContainer}>
                        <Heading as='h4' size='md'>
                            Añadir una pelicula
                        </Heading>
                    </div>
                   <ModificationForm option={'movie'} />
                   
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
                            Aceptar
                        </Button>
                    </div>

                </div>
            </div>
        </div> )}



    }

  return (
    <>
    <div style={styles.tableContainer}>
        <Heading style={styles.title}>Administración </Heading>
        <br></br>
        <Menu>
          <MenuButton  as={Button} rightIcon={<ChevronDownIcon />}>
            Elija una opción
          </MenuButton>
          <MenuList zIndex={10000}>
            <MenuItem 
            onClick={() => {
                setOption('serie');
              }}>
                Administrar series
            </MenuItem>
            <MenuItem 
            onClick={() => {
            setOption('movie');
            }}>
                Administrar peliculas
            </MenuItem>

            <MenuItem 
            onClick={() => {
            setOption('addSerie');
            }}>
                Añadir serie
            </MenuItem>
            
            <MenuItem 
            onClick={() => {
            setOption('addMovie');
            }}>
                Añadir pelicula
            </MenuItem>

          </MenuList>
        </Menu>
        <br></br>
        <br></br>
        {show()}
        
        
      </div>
    </>
  )
}

export default ManageContent;
