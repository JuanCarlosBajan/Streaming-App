import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import React from "react";
import ContentItem from "../ContentItem";

function Search() {
  return (
    <>
      <div className="search__bar">
        <InputGroup>
          <InputLeftElement pointerEvents={"none"} children={<Search2Icon />} />
          <Input placeholder="Busca por título, género, actor o director"></Input>
        </InputGroup>
      </div>
      <div className="search__results">
        <ContentItem
          coverUrl="https://images-na.ssl-images-amazon.com/images/I/91eOgodm4nL.jpg"
          title="Star Wars: Episode V"
        />
        <ContentItem
          coverUrl="https://images-na.ssl-images-amazon.com/images/I/91eOgodm4nL.jpg"
          title="Star Wars: Episode V"
        />
        <ContentItem
          coverUrl="https://images-na.ssl-images-amazon.com/images/I/91eOgodm4nL.jpg"
          title="Star Wars: Episode V"
        />
        <ContentItem
          coverUrl="https://images-na.ssl-images-amazon.com/images/I/91eOgodm4nL.jpg"
          title="Star Wars: Episode V"
        />
      </div>
    </>
  );
}

export default Search;
