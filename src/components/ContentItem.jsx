import { HStack, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { colors } from "../utils/colors";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { addFavoriteSeries, removeFavoriteSeries } from "../services/content";

function ContentItem({
  coverUrl,
  onClick,
  title,   
  favorite = true,
  toggleFavorite,
  contentCode,
  search
}) {

  const favFunct = () => {
    return (
      favorite ? (
        <AiFillHeart
          onClick={() => {
            toggleFavorite(contentCode, { title, coverUrl });
          }}
          style={{
            color: colors.primaryvariant1,
            fontSize: 30,
          }}
        />
      ) : (
        <AiOutlineHeart
          onClick={() => {
            toggleFavorite(contentCode, { title, coverUrl });
          }}
          style={{
            color: colors.primaryvariant1,
            fontSize: 30,
          }}
        />
      )
    )
  }

  return (
    <VStack className="content-item">
      <img
        src={coverUrl}
        onClick={() => {
          onClick(contentCode);
        }}
        alt={title}
        className="content-item__image"
      />
      <HStack>
        <h2>{title}</h2> 
        
        {search ? '' : favFunct()}
      </HStack>
    </VStack>
  );
}

export default ContentItem;
