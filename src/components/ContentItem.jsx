import { HStack, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { colors } from "../utils/colors";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

function ContentItem({
  coverUrl,
  onClick,
  title,
  favorite = true,
  onFavoriteClick,
}) {
  const [isFavorite, setFavorite] = useState(favorite);
  return (
    <VStack className="content-item">
      <img src={coverUrl} alt={title} className="content-item__image" />
      <HStack>
        <h2>{title}</h2>
        {isFavorite ? (
          <AiFillHeart
            onClick={() => {
              setFavorite(!isFavorite);
            }}
            style={{
              color: colors.primaryvariant1,
              fontSize: 30,
            }}
          />
        ) : (
          <AiOutlineHeart
            onClick={() => {
              setFavorite(!isFavorite);
            }}
            style={{
              color: colors.primaryvariant1,
              fontSize: 30,
            }}
          />
        )}
      </HStack>
    </VStack>
  );
}

export default ContentItem;
