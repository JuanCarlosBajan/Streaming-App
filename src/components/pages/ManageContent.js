import React, { useState } from 'react'
import { Table, Tbody, Tr, Td, TableContainer, Thead, Th } from '@chakra-ui/react'
import TableHeader from "../TableHeader"
import ModificationForm from "../ModificationForm"
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { Heading, useToast, FormLabel } from '@chakra-ui/react'
import InputInfo from '../InputInfo'
import Inputs from '../Inputs'
import { createMovie, getMoviesAdmin, getSeriesAdmin, deleteMoviesAdmin, deleteSeriesAdmin, modifyMovie, modifySeries, createSeries, getSeries, createEpisode, removeEpisode, getAdvertisersAdmin, deleteAdvertisersAdmin, postAdvertisersAdmin, modifyAdvertiserAdmin, getAdvertiserAds, createAd, linkAdAdmin, removeAdAdmin, modifyUser, deleteUserAdmin } from '../../services/content';
import { Link } from 'react-router-dom';
import AdvertiserLinkModal from '../AdvertiserLinkModal';
import { getUsers } from '../../services/user';



const ManageContent = () => {

    const [option, setOption] = useState('');
    const toast = useToast();
    const [moviesAdmin, setMoviesAdmin] = useState([]);
    const [seriesAdmin, setSeriesAdmin] = useState([]);
    const [episodesAdmin, setEpisodesAdmin] = useState([]);
    const [advertisersAdmin, setAdvertisersAdmin] = useState([]);
    const [adsAdmin, setAdsAdmin] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [selectedAd, setSelectedAd] = useState(null);
    const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
    const { isOpen: isOpenEpisode, onOpen: onOpenEpisode, onClose: onCloseEpisode } = useDisclosure();
    const { isOpen: isOpenAdvertiser, onOpen: onOpenAdvertiser, onClose: onCloseAdvertiser } = useDisclosure();
    const { isOpen: isOpenAd, onOpen: onOpenAd, onClose: onCloseAd } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [usersAdmin, setUsersAdmin] = useState([]);


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

    const getDataAdvertiserAds = async (advertiserCode) => {
        const data = await getAdvertiserAds(advertiserCode);
        if (data.ok) {
            setAdsAdmin(data.ads)
        }
    }

    const linkAd = async (ad) => {
        const data = await linkAdAdmin(ad);
        if (data.ok) {
            toast({
                title: "Has enlazado un anuncio",
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

    const addAdvertiser = async (advertiser) => {
        const data = await postAdvertisersAdmin(advertiser);
        if (data.ok) {
            toast({
                title: "Has creado un anunciante",
                position: "top",
                status: "success",
                isClosable: true
            })
            await getDataAdvertisers();
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
    const updateAdvertiser = async (advertiser) => {
        const data = await modifyAdvertiserAdmin(advertiser.advertiserCode, advertiser);
        if (data.ok) {
            toast({
                title: "Has creado un anunciante",
                position: "top",
                status: "success",
                isClosable: true
            })
            await getDataAdvertisers();
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
            getDataSeries();
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

    const insertAd = async (ad) => {

        const data = await createAd(selectedAdvertiser, ad);
        if (data.ok) {
            toast({
                title: "Has creado un anuncio",
                position: "top",
                status: "success",
                isClosable: true
            })
            getDataAdvertiserAds(selectedAdvertiser);
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
    const updateUser = async (user) => {
        const userCode = user.userCode;
        delete user.userCode;
        const data = await modifyUser(userCode, user)

        if (data.ok) {
            toast({
                title: "Has modificado el usuario",
                position: "top",
                status: "success",
                isClosable: true
            })
            getUsersInfo();
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

    const removeAd = async (adCode) => {
        console.log('rem')
        const data = await removeAdAdmin(selectedAdvertiser, adCode);
        if (data.ok) {
            getDataAdvertiserAds(selectedAdvertiser)
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

    const getUsersInfo = async () => {
        const data = await getUsers();
        if (data.ok) {
            setUsersAdmin(data.users);
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

    const deleteUser = (userCode) => {
        deleteUserAdmin(userCode);
        getUsersInfo();
    }

    const deleteAdvertiser = (advertiserCode) => {
        deleteAdvertisersAdmin(advertiserCode);
        setAdvertisersAdmin(advertisersAdmin.filter((element) => element.advertiserCode !== advertiserCode))
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
                                    <Td> {element.studio} </Td>
                                    <Td> {element.duration} minutos </Td>
                                    <Td> {element.publishedAt} </Td>
                                    <Td> {element.genre} </Td>
                                    <Td> {element.director} </Td>
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
                                    <Td> {element.studio} </Td>
                                    <Td> {element.publishedAt} </Td>
                                    <Td> {element.genre} </Td>
                                    <Td> {element.director} </Td>
                                    <Td> {element.description} </Td>
                                    <Td> {element.coverUrl} </Td>
                                    <Td> {element.categories} </Td>
                                    <Td> {element.episodeCount} </Td>
                                    <Td> {element.seasonCount} </Td>
                                    <Td>
                                        <BiPencil cursor={'pointer'} onClick={() => {
                                            setDefaultContent(element);
                                            setOption("serie");
                                            onOpen()
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
        if (option === 'users') {
            return (
                <TableContainer>
                    <Table variant='simple' size='md'>
                        <TableHeader option={'users'} />
                        <Tbody>
                            {usersAdmin.map((element, index) => (
                                <Tr key={index}>
                                    <Td> {element.userCode} </Td>
                                    <Td> {element.user} </Td>
                                    <Td> {element.email} </Td>
                                    <Td> {element.password} </Td>
                                    <Td> {element.name} </Td>
                                    <Td> {element.lastName} </Td>
                                    <Td> {String(element.active)} </Td>
                                    <Td> {element.plan} </Td>
                                    <Td> {element.role} </Td>
                                    <Td>
                                        <BiPencil cursor={'pointer'} onClick={() => {
                                            setDefaultContent(element);
                                            setOption("users");
                                            onOpen()
                                        }} />
                                    </Td>
                                    <Td>
                                        <BiTrash cursor={'pointer'} onClick={() => deleteUser(element.userCode)} />
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
                                    <Td>
                                        <a href='#' onClick={() => {
                                            setSelectedAdvertiser(element.advertiserCode)
                                            getDataAdvertiserAds(element.advertiserCode)
                                        }}>{element.advertiserCode}</a>
                                    </Td>
                                    <Td> {element.name} </Td>
                                    <Td>
                                        <BiPencil cursor={'pointer'} onClick={() => {
                                            onOpen()
                                            setDefaultContent(element);

                                        }} />
                                    </Td>

                                    <Td>
                                        <BiTrash cursor={'pointer'} onClick={() => deleteAdvertiser(element.advertiserCode)} />
                                    </Td>
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
        if (option === "addAdvertisers") {
            return (
                <div style={styles.provisionalBackgorund}>
                    <div style={styles.outerContainer} className='container'>
                        <div style={styles.infoContainer}>
                            <div style={styles.titleContainer}>
                                <Heading as='h4' size='md'>
                                    Añadir anunciante
                                </Heading>
                            </div>
                            <ModificationForm option={'advertisers'} defaultContent={{}} onSend={(data) => { addAdvertiser(data) }} />
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
                                setSelectedAdvertiser(null);
                                getDataSeries();
                            }}>
                            Administrar series
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setOption('movie');
                                setSelectedSeries(null);
                                setSelectedAdvertiser(null);
                                getDataMovies();
                            }}>
                            Administrar peliculas
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('advertisers');
                                getDataAdvertisers();
                                setSelectedSeries(null);
                                setSelectedAdvertiser(null);
                            }}>
                            Administrar anunciantes
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('users');
                                getUsersInfo();
                                setSelectedSeries(null);
                            }}>
                            Administrar Usuarios
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                setOption('addMovie');
                                setSelectedSeries(null);
                                setSelectedAdvertiser(null);
                            }}>
                            Añadir pelicula
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setOption('addSerie');
                                setSelectedSeries(null);
                                setSelectedAdvertiser(null);
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
                    isOpen ? option === 'movie' ? <Modal isOpen={isOpen} onClose={onClose}>
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
                                    onSend={
                                        (data) => {
                                            console.log(data, option);
                                            if (option === 'movie') {
                                                updateMovie(data)
                                            } else if (option === 'serie') {

                                                updateSeries(data)
                                            } else if (option === 'advertisers') {
                                                updateAdvertiser(data)
                                            }
                                        }
                                    }
                                    option={option}
                                    defaultContent={defaultContent}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal> :
                        option === 'users' ?
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        <Heading as='h4' size='md'>
                                            Modificando {defaultContent.user}
                                        </Heading>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <ModificationForm
                                            onSend={
                                                (data) => {
                                                    if (option === 'movie') {
                                                        updateMovie(data)
                                                    } else if (option === 'series') {
                                                        updateSeries(data)
                                                    } else if (option === 'advertisers') {
                                                        updateAdvertiser(data)
                                                    } else if (option === 'users') {
                                                        updateUser(data)
                                                    }
                                                }
                                            }
                                            option={option}
                                            defaultContent={defaultContent}
                                        />
                                    </ModalBody>
                                </ModalContent>
                            </Modal> : '' : ''
                }

                {
                    isOpenAdvertiser ? <Modal isOpen={isOpenAdvertiser} onClose={onCloseAdvertiser}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Heading as='h4' size='md'>
                                    Modificando {defaultContent.title}
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <AdvertiserLinkModal
                                    action="link"
                                    onSend={
                                        (data) => {
                                            data.adCode = selectedAd;
                                            linkAd(data)
                                        }
                                    }

                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal> : ''
                }
                {
                    isOpenAd ? <Modal isOpen={isOpenAd} onClose={onCloseAd}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Heading as='h4' size='md'>
                                    Agrega un anuncio
                                </Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <AdvertiserLinkModal
                                    action="add"
                                    onSend={
                                        (data) => {
                                            insertAd(data);
                                        }
                                    }

                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal> : ''
                }

                {selectedSeries ?
                    <>
                        <Modal isOpen={isOpenEpisode} onClose={onCloseEpisode}>
                            <ModalOverlay />
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

                {
                    selectedAdvertiser ? <>
                        <Heading marginTop={24}>Anuncios</Heading>
                        <Button
                            marginTop={8}
                            marginBottom={8}
                            onClick={() => {
                                onOpenAd()
                            }}>
                            Agregar Anuncio
                        </Button>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Titulo</Th>
                                    <Th>url</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    adsAdmin.map(ad => {
                                        return (<Tr key={ad.adCode}>
                                            <Td>{ad.title}</Td>
                                            <Td>{ad.url}</Td>
                                            <Td>
                                                <BiPlus cursor={'pointer'} onClick={() => {
                                                    setSelectedAd(ad.adCode)
                                                    onOpenAdvertiser()
                                                }} />
                                            </Td>
                                            <Td>
                                                <BiTrash cursor={'pointer'} onClick={() => {
                                                    setSelectedAd(ad.adCode)
                                                    removeAd(ad.adCode)
                                                }} />
                                            </Td>
                                            {/* <BiTrash cursor={'pointer'} onClick={() => deleteEpisode(episode.episodeCode)} /> */}
                                        </Tr>);
                                    })
                                }
                            </Tbody>
                        </Table>
                    </> : ''
                }

            </div>

        </>
    )
}

export default ManageContent;
