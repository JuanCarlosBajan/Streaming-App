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
} from "@chakra-ui/react";
import React from "react";

function AdPopup({ isOpen, handleClose }) {
  const { onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ANUNCIO!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
            recusandae quis, fugiat soluta, ipsum dolorum temporibus autem ad
            numquam dicta possimus minus. Fugiat a ipsum excepturi harum velit
            quo sapiente!
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdPopup;
