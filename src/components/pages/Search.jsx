import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import ContentItem from "../ContentItem";

import { FormLabel, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";


import "swiper/css";
import "swiper/css/navigation";
import { getResult } from '../../services/content';
import { useNavigate } from 'react-router-dom';
import NavMenu from '../NavMenu';

function Search() { 
  
  const toast = useToast();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
      const getData = async () => {
          if (userInput.length > 0){
            const data = await getResult(userInput);
          if (data.ok) {
            setInfo(data.content);  
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
      }
      getData();   
      console.log(info);
 
  }, [userInput]);





  const reproduceMovie = (movieCode) => {
      navigate(`/watch?type=movie&code=${movieCode}`)
  }

  const showData = (infoMS, userInputData) => {
    if(infoMS.length > 0){
      return(
        infoMS.map((element, index) => 
        <ContentItem key={index}
          onClick={() => { reproduceMovie(element.movieCode) }}
          contentCode={element.movieCode}
          search={true}          
          coverUrl={element.coverUrl}
          title={element.title}/>
    ))}
    else if( !(infoMS.length > 0) && info.length === 0 ){
      return(
        <p>No hay resultados.</p>
      )}
    else if( !(infoMS.length > 0) && userInputData.length === 0 ){
      <p>Busca algo.</p>
    }
  }
 


  return (
      <>
      <div className="search__bar">
        <InputGroup>
          <InputLeftElement pointerEvents={"none"} children={<Search2Icon />} />
            <Input 
              placeholder="Busca por título, género, actor o director"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}>
            </Input>
        </InputGroup>
      </div>

      <div className="search__results">         
         {showData(info, userInput)}
      </div>       
      </>


  );
}

export default Search;
