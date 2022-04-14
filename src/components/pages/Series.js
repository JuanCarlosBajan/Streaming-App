import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { addFavoriteSeries, getAllSeries, getFavoriteSeries, getFinishedSeries, getInProgressSeries, removeFavoriteSeries } from '../../services/content';
import { useNavigate } from 'react-router-dom';



export const Series = () => {

    const toast = useToast();
    const [series, setSeries] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [finished, setFinished] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSeries = async () => {
            const data = await getAllSeries();
            if (data.ok) {
                if (favorites.length === 0) {
                    await getFavorites();
                    await getFinished();
                    await getInProgress();
                    setSeries(data.series);

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

        const getFinished = async () => {
            const data = await getFinishedSeries(localStorage.getItem('profileCode'));

            if (data.ok) {
                setFinished(data.series);
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
            const data = await getInProgressSeries(localStorage.getItem('profileCode'));
            if (data.ok) {
                setInProgress(data.series);
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
            const data = await getFavoriteSeries(localStorage.getItem('profileCode'));
            if (data.ok) {
                setFavorites(data.series);
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

        getSeries();    // Fetch series from server
    }, []);

    /**
     * Toggle the favorite status for an item
     */
    const toggleFavorite = async (seriesCode, { title, coverUrl }) => {
        const isAlreadyFavorite = favorites.map(fav => fav.seriesCode).includes(seriesCode);
        if (!isAlreadyFavorite) {
            const data = await addFavoriteSeries(localStorage.getItem('profileCode'), seriesCode);
            if (data.ok) {
                // add the series to the favorite
                setFavorites([...favorites, { title, coverUrl, seriesCode }])
            }
        } else {
            const data = await removeFavoriteSeries(localStorage.getItem('profileCode'), seriesCode);
            if (data.ok) {
                setFavorites(favorites.filter(fav => fav.seriesCode !== seriesCode));
            }
        }
    }


    const reproduceSeries = (seriesCode) => {
        navigate(`/watch?type=series&code=${seriesCode}`)
    }

    return (
        <>
            {
                favorites.length > 0 ? <>
                    <div className='container'>
                        <FormLabel>
                            Tus Series Favoritas
                        </FormLabel>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={40}
                            slidesPerGroup={2}
                            navigation={true}
                            modules={[Navigation]}>
                            {favorites.map((element, index) => (
                                <SwiperSlide key={index}>
                                    <ContentItem
                                        contentCode={element.seriesCode}
                                        favorite={true}
                                        onClick={reproduceSeries}
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
                inProgress.length > 0 ? <>
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

                            {inProgress.map((element, index) => (
                                <SwiperSlide key={`${index}`}>
                                    <ContentItem type={"series"}
                                        onClick={reproduceSeries}
                                        contentCode={element.seriesCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.seriesCode).includes(element.seriesCode)}
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
                                <SwiperSlide key={`${index}`}>
                                    <ContentItem type={"series"}
                                        onClick={reproduceSeries}
                                        contentCode={element.seriesCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.seriesCode).includes(element.seriesCode)}
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
            {Object.keys(series).map(genre => {
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

                            {series[genre].map((element, index) => (
                                <SwiperSlide key={`${genre}-${index}`}>
                                    <ContentItem type={"series"}
                                        onClick={reproduceSeries}
                                        contentCode={element.seriesCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.seriesCode).includes(element.seriesCode)}
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
        </>


    );
}