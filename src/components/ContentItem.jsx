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
  contentCode,
  favorite = true,
  onFavoriteClick = (type) => {},
  type,
}) {
  const [isFavorite, setFavorite] = useState(favorite);

  /**
   * Adds an item to the favorite list
   */
  const addToFavorites = async () => {
    if (type === "series") {
      addToFavoritesSeries(contentCode);
    }
  };

  /**
   * Add to a favorite series
   * @param {number} seriesCode
   */
  const addToFavoritesSeries = async (seriesCode) => {
    const result = await addFavoriteSeries(
      localStorage.getItem("profileCode"),
      seriesCode
    );
    if (result.ok) {
      setFavorite(!isFavorite);
      onFavoriteClick("add", { title, coverUrl, seriesCode: contentCode });
    }
  };

  /**
   * Removes a series from the favorites
   */
  const removeFromFavorites = async () => {
    if (type === "series") {
      removeFromFavoritesSeries(contentCode);
    }
  };

  /**
   * Removes a series from the favorites
   * @param {number} seriesCode
   */
  const removeFromFavoritesSeries = async (seriesCode) => {
    const result = await removeFavoriteSeries(
      localStorage.getItem("profileCode"),
      seriesCode
    );
    if (result.ok) {
      setFavorite(!isFavorite);
      onFavoriteClick("remove", { title, coverUrl, seriesCode: contentCode });
    }
  };

  return (
    <VStack className="content-item">
      <img src={coverUrl} alt={title} className="content-item__image" />
      <HStack>
        <h2>{title}</h2>
        {isFavorite ? (
          <AiFillHeart
            onClick={() => {
              removeFromFavorites();
            }}
            style={{
              color: colors.primaryvariant1,
              fontSize: 30,
            }}
          />
        ) : (
          <AiOutlineHeart
            onClick={() => {
              addToFavorites();
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
