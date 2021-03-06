import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import ContentItem from "../ContentItem";

import { FormLabel, useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import { getResult } from "../../services/content";
import { useNavigate } from "react-router-dom";
import NavMenu from "../NavMenu";
import debounce from "lodash.debounce";

function Search() {
  const toast = useToast();
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const getData = async (input) => {
    setUserInput(input.target.value);
    if (input.target.value.length > 0) {
      const data = await getResult(input.target.value);
      console.log(data);
      if (data.ok) {
        setInfo(data.content);
      } else {
        data.errors.forEach((element) => {
          toast({
            title: element,
            position: "top",
            status: "error",
            isClosable: true,
          });
        });
      }
    }
  };
  const debouncedChangeHandler = useCallback(debounce(getData, 500), []);

  const reproduceMovie = (element) => {
    if (element.movieCode) {
      navigate(`/watch?type=movie&code=${element.movieCode}`);
    } else if (element.seriesCode) {
      navigate(`/watch?type=series&code=${element.seriesCode}`);
    }
  };

  const showData = (infoMS) => {
    if (infoMS.length > 0) {
      return infoMS.map((element, index) => (
        <ContentItem
          key={index}
          onClick={() => {
            reproduceMovie(element);
          }}
          contentCode={element.movieCode}
          search={true}
          coverUrl={element.coverUrl}
          title={element.title}
        />
      ));
    } else if (!(infoMS.length > 0) && info.length === 0) {
      return <p>No hay resultados.</p>;
    }
  };

  return (
    <>
      <div className="search__bar">
        <InputGroup>
          <InputLeftElement pointerEvents={"none"} children={<Search2Icon />} />
          <Input
            focusBorderColor={"#5E2BFF"}
            placeholder="Busca por t??tulo, g??nero, actor o director"
            onChange={debouncedChangeHandler}
          ></Input>
        </InputGroup>
      </div>

      <div className="search__results">
        {userInput.length > 0 ? showData(info) : []}
      </div>
    </>
  );
}

export default Search;
