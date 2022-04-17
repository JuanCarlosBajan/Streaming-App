import React, {useState, useEffect} from 'react'
import {Table, Tbody, Tr, Td, TableContainer} from '@chakra-ui/react'
import TableHeader from "../TableHeader"
import ModificationForm from "../ModificationForm"
import { BiPencil, BiTrash } from "react-icons/bi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react'
import { Heading, useToast, FormLabel } from '@chakra-ui/react'
import { getMoviesAdmin, getSeriesAdmin, deleteMoviesAdmin, deleteSeriesAdmin } from '../../services/content';



const ManageContent = () => {
    
    const [option, setOption] = useState('');
    const toast = useToast();
    const [moviesAdmin, setMoviesAdmin] = useState([]);
    const [seriesAdmin, setSeriesAdmin] = useState([]);
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


    const getDataMovies = async () => {  
        const data = await getMoviesAdmin();
        if (data.ok) {
          setMoviesAdmin(data.movies);
          console.log(moviesAdmin);  
        }
        else {
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

    const getDataSeries = async () => {  
        const data = await getSeriesAdmin();
        if (data.ok) {
          setSeriesAdmin(data.series);
          console.log(moviesAdmin);  
        }
        else {
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

    const deleteMovie = (movieCode) => {
        deleteMoviesAdmin(movieCode);
        setMoviesAdmin(moviesAdmin.filter((element) => element.movieCode !== movieCode))
    }


    const deleteSerie = (seriesCode) => {
        deleteSeriesAdmin(seriesCode);
        setSeriesAdmin(seriesAdmin.filter((element) => element.seriesCode !== seriesCode))
    }

    

    const show = () => {
        if (option === 'movie'){
            return(<TableContainer> 
            <Table variant='simple'>
                <TableHeader option={'movie'}/>
                <Tbody>
                        {
                            moviesAdmin.map((element, index) => (
                                <Tr key={index}>
                                <Td> {element.movieCode} </Td>
                                <Td> {element.title} </Td>
                                <Td> {element.studioCode} </Td>
                                <Td> {element.duration} minutos </Td>
                                <Td> {element.publishedAt} </Td>
                                <Td> {element.genre} </Td>
                                <Td> {element.directorCode} </Td>
                                <Td> {element.description} </Td>
                                <Td> {element.coverUrl} </Td>
                                <Td> {element.categories} </Td>
                                <Td>  
                                    <BiPencil cursor={'pointer'} onClick={onOpen}/>  
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay /> {/*filter o volver a traer toda y actualizar con setmovies*/}
                                        <ModalContent>
                                        <ModalHeader>
                                            <Heading as='h4' size='md'>
                                                Añada una pelicula
                                            </Heading>
                                        </ModalHeader>
                                        <ModalCloseButton /> 
                                        <ModalBody>
                                            <ModificationForm option={'movie'} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color= {colors.primary}>Modificar</Button>
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                </Td>
                                <Td>  
                                    <BiTrash cursor={'pointer'} onClick={() => deleteMovie(element.movieCode)}/> 
                                </Td>
                                </Tr>
                        ))}

                </Tbody>
            </Table>
        </TableContainer>)}
        if(option === 'serie') {
            return(
            <TableContainer> 
            <Table variant='simple' size='md'>
                <TableHeader option={'serie'} />
                <Tbody>
                        {seriesAdmin.map((element, index) => (
                                <Tr key={index}>
                                    <Td> {element.seriesCode} </Td>
                                    <Td> {element.title} </Td>
                                    <Td> {element.studioCode} </Td>
                                    <Td> {element.publishedAt} </Td>
                                    <Td> {element.genre} </Td>
                                    <Td> {element.directorCode} </Td>
                                    <Td> {element.description} </Td>
                                    <Td> {element.coverUrl} </Td>
                                    <Td> {element.categories} </Td>
                                    <Td> {element.episodeCount} </Td>
                                    <Td> {element.seasonCount} </Td>
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
                                        <BiTrash cursor={'pointer'} onClick={() => deleteSerie(element.seriesCode)}/> 
                                    </Td>
                                </Tr>
                        ))}         
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
        </div> 
        )}}

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
                getDataSeries();
              }}>
                Administrar series
            </MenuItem>
            <MenuItem 
            onClick={() => {
            setOption('movie');
            getDataMovies();
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
