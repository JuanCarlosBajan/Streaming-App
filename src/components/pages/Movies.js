import { FormLabel } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ContentItem from "../ContentItem"


import "swiper/css";
import "swiper/css/navigation";



export const Movies = () => {

    const [series, setSeries] = useState([]) 

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

    const List = ["https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg", 
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg", 
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg",
                  "https://i.pinimg.com/564x/81/7c/90/817c90de6a9c8c670ffb72fdaafebba8.jpg"] 

    return (
        <>
            <div className="container">
            <FormLabel> Movies </FormLabel>
            <Swiper
                slidesPerView={6}
                spaceBetween={40}
                slidesPerGroup={2}
                navigation={true} 
                modules={[Navigation]}
                className="mySwiper">

            {List.map((element, index) => (
                <SwiperSlide key={index}>
                    <ContentItem coverUrl={element} title={"movie"} />
                </SwiperSlide>
            ))}
            </Swiper>    
        </div>
                
        <br></br>

        <div className="container">
            <FormLabel> Series </FormLabel>
            <Swiper
                slidesPerView={6}
                spaceBetween={40}
                slidesPerGroup={2}
                navigation={true} 
                modules={[Navigation]}
                className="mySwiper">

            {List.map((element, index) => (
                <SwiperSlide key={index}>
                    <ContentItem coverUrl={element} title={"movie"} />
                </SwiperSlide>
            ))}
            </Swiper>    
        </div>

        </>
        

    );
}