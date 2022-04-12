import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import { getMovieAd, getSeriesAd } from "../services/ads";

function AdPopup({ isOpen, handleClose, contentCode, contentType }) {
  const { onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [advertiser, setAdvertiser] = useState("");
  useEffect(() => {
    console.log("open");
    const getAd = async () => {
      let resp =
        contentType === "movie"
          ? await getMovieAd(contentCode)
          : await getSeriesAd(contentCode);
      if (resp.ok) {
        setUrl(resp.ad.url);
        setAdvertiser(resp.ad.name);
        setTitle(resp.ad.title);
      } else {
        console.log("error loading add");
      }
    };

    getAd();
  }, []);

  const opts = {
    height: "390",
    width: "500",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <>
      <Modal
        size={"xl"}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {advertiser} - {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>{url ? <YouTube opts={opts} videoId={url} /> : ""}</Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdPopup;
