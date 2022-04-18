import { Box, FormLabel, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { addFavoriteMovies, getAllMovies, getFavoriteMovies, getFinishedMovies, getInProgressMovies, removeFavoriteMovies, getFeaturedMovies } from '../../services/content';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../NavMenu';



export const Movies = () => {

    const toast = useToast();
    const [movies, setMovies] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [finished, setFinished] = useState([]);
    const [inProgess, setInProgress] = useState([]);
    const [featured, setFeatured] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            const data = await getAllMovies();
            if (data.ok) {
                if (favorites.length === 0) {
                    await getFavorites();
                    await getFinished();
                    await getInProgress();
                    await getFeatured();
                    setMovies(data.movies);
                }
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


        const getFavorites = async () => {
            const data = await getFavoriteMovies(localStorage.getItem('profileCode'));
            if (data.ok) {
                setFavorites(data.movies);
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

        const getInProgress = async () => {
            const data = await getInProgressMovies(localStorage.getItem('profileCode'));
            if (data.ok) {
                setInProgress(data.movies);
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

        const getFeatured = async () => {
            const data = await getFeaturedMovies(localStorage.getItem('profileCode'));
            if (data.ok) {
                setFeatured(data.movies);
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

        const getFinished = async () => {
            const data = await getFinishedMovies(localStorage.getItem('profileCode'));
            if (data.ok) {
                setFinished(data.movies);
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

        getMovies();    // Fetch movies from server
    }, []);

    const reproduceMovie = (movieCode) => {
        navigate(`/watch?type=movie&code=${movieCode}`)
    }


    /**
     * Toggle the favorite status for an item
     */
    const toggleFavorite = async (movieCode, { title, coverUrl }) => {

        const isAlreadyFavorite = favorites.map(fav => fav.movieCode).includes(movieCode);

        if (!isAlreadyFavorite) {
            const data = await addFavoriteMovies(localStorage.getItem('profileCode'), movieCode);
            if (data.ok) {
                setFavorites([...favorites, { title, coverUrl, movieCode }])
            }
        } else {
            const data = await removeFavoriteMovies(localStorage.getItem('profileCode'), movieCode);
            if (data.ok) {
                setFavorites(favorites.filter(fav => fav.movieCode !== movieCode));
            }
        }
    }


    return (
        <Box padding={10}>

            {
                favorites.length > 0 ? <>
                    <div className='container'>
                        <FormLabel>
                            Tus Peliculas Favoritas
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>
                            {favorites.map((element, index) => (
                                <SwiperSlide key={index}>
                                    <ContentItem type={"movies"}
                                        onClick={() => { reproduceMovie(element.movieCode) }}
                                        contentCode={element.movieCode}
                                        favorite={true}
                                        toggleFavorite={toggleFavorite}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
                                        search={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </> : ''
            }

            {
                inProgess.length > 0 ? <>
                    <div className='container'>
                        <FormLabel>
                            Termina de ver
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>
                            {inProgess.map((element, index) => (
                                <SwiperSlide key={index}>
                                    <ContentItem type={"movies"}
                                        onClick={() => { reproduceMovie(element.movieCode) }}
                                        contentCode={element.movieCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.movieCode).includes(element.movieCode)}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
                                        search={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </> : ''
            }
            {
                finished.length > 0 ? <>
                    <div className='container'>
                        <FormLabel>
                            Ver Otra Vez
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>
                            {finished.map((element, index) => (
                                <SwiperSlide key={index}>
                                    <ContentItem type={"movies"}
                                        onClick={() => { reproduceMovie(element.movieCode) }}
                                        contentCode={element.movieCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.movieCode).includes(element.movieCode)}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
                                        search={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </> : ''
            }
            {
                featured.length > 0 ? <>
                    <div className='container'>
                        <FormLabel>
                            Recomendadas
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>
                            {featured.map((element, index) => (
                                <SwiperSlide key={index}>
                                    <ContentItem type={"movies"}
                                        onClick={() => { reproduceMovie(element.movieCode) }}
                                        contentCode={element.movieCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.movieCode).includes(element.movieCode)}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </> : ''
            }
            {Object.keys(movies).map(genre => {
                return (
                    <div className='container' key={genre}>
                        <FormLabel style={{ textTransform: "capitalize" }}>
                            {genre}
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>

                            {movies[genre].map((element, index) => (
                                <SwiperSlide key={`${genre}-${index}`}>
                                    <ContentItem type={"movies"}
                                        onClick={() => { reproduceMovie(element.movieCode) }}
                                        contentCode={element.movieCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.movieCode).includes(element.movieCode)}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
                                        search={false}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            })}
        </Box>


    );
}