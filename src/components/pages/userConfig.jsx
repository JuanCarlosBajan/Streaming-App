import React from "react";
import { Button, ButtonGroup, useToast } from "@chakra-ui/react";
import { downgrade } from "../../services/user";

const UserConfig = ({ user = {} }) => {
  const toast = useToast();

  const down = async () => {
    const data = await downgrade(user.userCode);
    if (data.ok) {
      //   toast({
      //     title: ":( ",
      //     position: "top",
      //     status: "success",
      //     isClosable: true,
      //   });
    } else {
      //   toast({
      //     title: "Ya no puedes reducir tu cuenta ",
      //     position: "top",
      //     status: "error",
      //     isClosable: true,
      //   });
    }
  };

  return (
    <Button
      colorScheme="blue"
      onClick={() => {
        down();
      }}
    >
      Downgrade Account
    </Button>
  );
};

export default UserConfig;
