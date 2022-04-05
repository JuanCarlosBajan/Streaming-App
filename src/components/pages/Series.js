import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";
import { getAllSeries } from '../../services/content';



export const Series = () => {

    const toast = useToast();

    const [series, setSeries] = useState({});

    useEffect(() => {
        const getSeries = async () => {
            const data = await getAllSeries();
            if (data.ok) {
                setSeries(data.series);
                console.log(series);
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

    /*
    useEffect(() => {
        const getSeries = async () => {
            const seriesFromServer = await fetchSeries()
            setSeries(seriesFromServer)
        }
        getSeries()
    }, [])

    const fetchSeries = async () => {
        const res = await fetch('http://localhost:8080/api/content/series')
        const data = await res.json()

        //console.log(data)
        return data
    }
    */

    return (
        <>
            {Object.keys(series).map(genre => {
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

                            {series[genre].map((element, index) => (
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