import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { getAllMovies } from '../../services/content';



export const Movies = () => {

    const toast = useToast();
    const [movies, setMovies] = useState({});

    useEffect(() => {
        const getMovies = async () => {
            const data = await getAllMovies();
            if (data.ok) {
                setMovies(data.movies);
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
        getMovies();    
    }, []);


    return (
        <>
            {Object.keys(movies).map(genre => {
                return (
                    <div className='container' key={genre}>
                        <FormLabel>
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
                                    <ContentItem coverUrl={element.coverUrl} title={element.title} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            })}
        </>


    );
}