import React, { useState } from 'react'
import { Table, Tbody, Tr, Td, TableContainer, Thead, Th } from '@chakra-ui/react'
import TableHeader from "../TableHeader"
import ModificationForm from "../ModificationForm"
import { BiPencil, BiTrash } from "react-icons/bi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { Heading, useToast, FormLabel } from '@chakra-ui/react'
import InputInfo from '../InputInfo'
import Inputs from '../Inputs'
import { createMovie, getMoviesAdmin, getSeriesAdmin, deleteMoviesAdmin, deleteSeriesAdmin, modifyMovie, modifySeries, createSeries, getSeries, createEpisode, removeEpisode, getAdvertisersAdmin } from '../../services/content';
import { Link } from 'react-router-dom';



const ManageContent = () => {

    const [option, setOption] = useState('');
    const toast = useToast();
    const [moviesAdmin, setMoviesAdmin] = useState([]);
    const [seriesAdmin, setSeriesAdmin] = useState([]);
    const [episodesAdmin, setEpisodesAdmin] = useState([]);
    const [advertisersAdmin, setAdvertisersAdmin] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const { isOpen: isOpenEpisode, onOpen: onOpenEpisode, onClose: onCloseEpisode } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [defaultContent, setDefaultContent] = useState({});

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

    

    const addMovie = async (movie) => {

        const data = await createMovie(movie);
        if (data.ok) {
            toast({
                title: "Has creado una pelicula",
                position: "top",
                status: "success",
                isClosable: true
            })
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
    const addSeries = async (series) => {
        const data = await createSeries(series);
        if (data.ok) {
            toast({
                title: "Has creado una serie",
                position: "top",
                status: "success",
                isClosable: true
            })
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

    const updateMovie = async (movie) => {
        const data = await modifyMovie(movie.movieCode, movie);
        if (data.ok) {
            toast({
                title: "Has modificado la pelicula",
                position: "top",
                status: "success",
                isClosable: true
            })
            getDataMovies();
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
    const updateSeries = async (series) => {
        const data = await modifySeries(series.seriesCode, series);
        if (data.ok) {
            toast({
                title: "Has modificado la serie",
                position: "top",
                status: "success",
                isClosable: true
            })
            getDataMovies();
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

    const deleteEpisode = async (episodeCode) => {
        const data = await removeEpisode(selectedSeries, episodeCode);
        if (data.ok) {
            getSeriesInfo(selectedSeries);
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

    const getSeriesInfo = async (seriesCode) => {
        const data = await getSeries(seriesCode);
        if (data.ok) {
            setEpisodesAdmin(data.series.episodes)
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

    const addEpsiode = async (episode) => {
        const data = await createEpisode(selectedSeries, episode);
        if (data.ok) {
            toast({
                title: "Has creado un episodio",
                position: "top",
                status: "success",
                isClosable: true
            })
            await getSeriesInfo(selectedSeries);
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

    const getDataAdvertisers = async () => {
        const data = await getAdvertisersAdmin();
        if (data.ok) {
            setAdvertisersAdmin(data.advertisers);
            console.log(data.advertisers);
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



    const show = () => {
        if (option === 'movie') {
            return (<TableContainer>
                <Table variant='simple'>
                    <TableHeader option={'movie'} />
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
                                    <Td> {element.description}  </Td>
                                    <Td> {element.coverUrl} </Td>
                                    <Td> {element.categories} </Td>
                                    <Td>
                                        <BiPencil cursor={'pointer'} onClick={() => {
                                            setDefaultContent(element);
                                            setOption("movie");
                                            onOpen();
                                        }} />
                                    </Td>
                                    <Td>
                                        <BiTrash cursor={'pointer'} onClick={() => deleteMovie(element.movieCode)} />
                                    </Td>
                                </Tr>
                            ))}

                    </Tbody>
                </Table>
            </TableContainer>)
        }
        if (option === 'serie') {
            return (
                <TableContainer>
                    <Table variant='simple' size='md'>
                        <TableHeader option={'serie'} />
                        <Tbody>
                            {seriesAdmin.map((element, index) => (
                                <Tr key={index}>
                                    <Td> <a href='#' onClick={() => {
                                        setSelectedSeries(element.seriesCode)
                                        getSeriesInfo(element.seriesCode);
                                    }}>{element.seriesCode}</a>  </Td>
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
                                        <BiPencil cursor={'pointer'} onClick={() => {
                                            onOpen()
                                            setDefaultContent(element);
                                            setOption("serie");
                                        }} />
                                    </Td>
                                    <Td>
                                        <BiTrash cursor={'pointer'} onClick={() => deleteSerie(element.seriesCode)} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>)
        }
        if (option === 'advertisers') {
            return (<TableContainer>
                <Table variant='simple'>
                    <TableHeader option={'advertisers'} />
                    <Tbody>
                        {
                            advertisersAdmin.map((element, index) => (
                                <Tr key={index}>
                                    <Td> {element.advertiserCode} </Td>
                                    <Td> {element.name} </Td>
                                </Tr>
                            ))}

                    </Tbody>
                </Table>
            </TableContainer>)
        }

        if (option === 'addSerie') {
            return (
                <div style={styles.provisionalBackgorund}>
                    <div style={styles.outerContainer} className='container'>
                        <div style={styles.infoContainer}>
                            <div style={styles.titleContainer}>
                                <Heading as='h4' size='md'>
                                    Añadir una serie
                                </Heading>
                            </div>
                            <ModificationForm option={'serie'} defaultContent={{}} onSend={(data) => { addSeries(data) }} />


                        </div>
                    </div>
                </div>

            )
        }
        if (option === 'addMovie') {
            return (
                <div style={styles.provisionalBackgorund}>
                    <div style={styles.outerContainer} className='container'>
                        <div style={styles.infoContainer}>
                            <div style={styles.titleContainer}>
                                <Heading as='h4' size='md'>
                                    Añadir una pelicula
                                </Heading>
                            </div>
                            <ModificationForm option={'movie'} defaultContent={{}} onSend={(data) => { addMovie(data) }} />
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <div style={styles.tableContainer}>
                <Heading style={styles.title}>Administración </Heading>
                <br></br>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Elija una opción
                    </MenuButton>
                    <MenuList zIndex={10000}>
                        <MenuItem
                            onClick={() => {
                                setOption('serie');
                                setSelectedSeries(null);
                                getDataSeries();
                            }}>
                            Administrar series
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setOption('movie');
                                setSelectedSeries(null);
                                getDataMovies();
                            }}>
                            Administrar peliculas
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('advertisers');
                                getDataAdvertisers();
                            }}>
                            Administrar anunciantes
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('addMovie');
                                setSelectedSeries(null);
                            }}>
                            Añadir pelicula
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setOption('addSerie');
                                setSelectedSeries(null);
                            }}>
                            Añadir serie
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('addAdvertisers');
                            }}>
                            Añadir anunciante
                        </MenuItem>

                    </MenuList>
                </Menu>
                <br></br>
                <br></br>
                {show()}
                {
                    isOpen ? <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay /> 
                        <ModalContent>
                            <ModalHeader>
                                <Heading as='h4' size='md'>
                                    Modificando {defaultContent.title}
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ModificationForm
                                    onSend={option === 'movie' ? updateMovie : updateSeries}
                                    option={option}
                                    defaultContent={defaultContent}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal> : ''
                }
                {selectedSeries ?
                    <>
                        <Modal isOpen={isOpenEpisode} onClose={onCloseEpisode}>
                            <ModalOverlay /> {/*filter o volver a traer toda y actualizar con setmovies*/}
                            <ModalContent>
                                <ModalHeader>
                                    <Heading as='h4' size='md'>
                                        Agregar Episodio
                                    </Heading>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <ModificationForm
                                        onSend={(data) => { addEpsiode(data) }}
                                        option={"addEpisode"}
                                        defaultContent={{}}
                                    />
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                        <Heading marginTop={24}>Episodios</Heading>
                        <Button
                            marginTop={8}
                            marginBottom={8}
                            onClick={() => {
                                onOpenEpisode()

                            }
                            }>
                            Agregar episodio
                        </Button>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Titulo</Th>
                                    <Th>Fecha Publicacion</Th>
                                    <Th>Temporada</Th>
                                    <Th>Duracion</Th>
                                    <Th>url</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    episodesAdmin.map(episode => {
                                        return (<Tr key={episode.episodeCode}>
                                            <Td>{episode.name}</Td>
                                            <Td>{(new Date(episode.datePublished)).toLocaleDateString()}</Td>
                                            <Td>{episode.season}</Td>
                                            <Td>{episode.duration}</Td>
                                            <Td>{episode.url}</Td>
                                            <BiTrash cursor={'pointer'} onClick={() => deleteEpisode(episode.episodeCode)} />
                                        </Tr>);
                                    })
                                }
                            </Tbody>
                        </Table>
                    </>
                    : ''}

            </div>

        </>
    )
}

export default ManageContent;
