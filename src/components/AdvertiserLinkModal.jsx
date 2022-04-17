import { Button, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

function AdvertiserLinkModal({ onSend }) {
  const colors = {
    primary: "#5E2BFF",
    primaryvariant1: "#531FFF",
    primaryvariant2: "#3400E0",
    secondary: "#0E131F",
    white: "#FFFF",
    gradient:
      "linear-gradient(135deg, rgba(33,0,143,1) 0%, rgba(94,43,255,0.6811099439775911) 100%)",
    soft: "#d9cbf9",
  };

  const styles = {
    outerContainer: {
      width: "100%",
      height: "auto",
      padding: "10px",
      borderRadius: "10px",
    },
  };

  const [type, setType] = useState();
  const [contentCode, setCode] = useState();

  return (
    <>
      <>
        <div style={styles.outerContainer}>
          <FormLabel color={colors.primary}>Tipo de contenido </FormLabel>
          <Select
            placeholder="Seleccione el tipo"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="movie">Pelicula</option>
            <option value="series">Serie</option>
          </Select>
        </div>
        <div style={styles.outerContainer}>
          <FormLabel color={colors.primary}>Codigo </FormLabel>
          <Input
            focusBorderColor={colors.primary}
            type="number"
            placeholder="Ingrese el Codigo de el contenido"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <div style={styles.innerContainer}>
          <Button
            backgroundColor={colors.primary}
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            color={colors.white}
            width="100%"
            marginTop="10px"
            _hover={{ bg: colors.primaryvariant1 }}
            _active={{
              bg: colors.primaryvariant2,
              transform: "scale(0.98)",
              borderColor: colors.primaryvariant2,
            }}
            _focus={{
              boxShadow:
                "0 0 1px 2px transparent, 0 1px 1px rgba(0, 0, 0, .15)",
            }}
            onClick={() => {
              onSend({ type, contentCode });
            }}
            disabled={!type || !contentCode}
          >
            Enlazar
          </Button>
        </div>
      </>
    </>
  );
}

export default AdvertiserLinkModal;
