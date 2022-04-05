import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { addFavoriteSeries, getAllSeries, getFavoriteSeries, removeFavoriteSeries } from '../../services/content';



export const Series = () => {

    const toast = useToast();
    const [series, setSeries] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getSeries = async () => {
            const data = await getAllSeries();
            if (data.ok) {
                if (favorites.length === 0) {
                    await getFavorites();
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
                                    <ContentItem type={"series"}
                                        contentCode={element.seriesCode}
                                        favorite={true}
                                        toggleFavorite={toggleFavorite}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
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
                                        contentCode={element.seriesCode}
                                        toggleFavorite={toggleFavorite}
                                        favorite={favorites.map(fav => fav.seriesCode).includes(element.seriesCode)}
                                        coverUrl={element.coverUrl}
                                        title={element.title}
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