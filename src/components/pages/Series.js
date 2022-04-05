import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { getAllSeries, getFavoriteSeries } from '../../services/content';



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

        getSeries();    // Fetch series from server
    }, []);

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

    const isFavorite = (seriesCode) => {
        const favoriteCodes = favorites.map(f => f.seriesCode);
        return favoriteCodes.includes(seriesCode);
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
                                        favorite={isFavorite(element.seriesCode)}
                                        onFavoriteClick={() => {
                                            getFavorites()
                                        }}
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
                                        onFavoriteClick={() => { getFavorites() }}
                                        favorite={isFavorite(element.seriesCode)}
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