import { VStack } from "@chakra-ui/react";
import React from "react";

function ContentItem({ coverUrl, onClick, title }) {
  return (
    <VStack className="content-item">
      <img src={coverUrl} alt={title} className="content-item__image" />
      <h2>{title}</h2>
    </VStack>
  );
}

export default ContentItem;
