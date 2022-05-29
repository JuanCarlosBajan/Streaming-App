import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BiPlay, BiPlayCircle } from "react-icons/bi";
import { colors } from "../../utils/colors";

/**
 * Simulation Component
 * @returns
 */
function Simulation() {
  const [simulationDate, setSimulationDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const styles = {
    outerContainer: {
      width: "500px",
      height: "495px",
      borderRadius: "30px",
      padding: "30px",
      backgroundColor: colors.white,
      overflowY: "scroll",
      border: "2px solid #5E2BFF",
    },
    innerContainer: {
      borderColor: colors.primary,
      padding: "10px",
    },
    provisionalBackgorund: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    titleContainer: {
      width: "100%",
      marginBottom: "20px",
    },
    infoContainer: {
      width: "100%",
      height: "auto",
    },
    tableContainer: {
      padding: "40px",
    },
  };

  /**
   *  Runs the simulation for the number of movies
   */
  const runViewSimulation = async () => {};

  return (
    <div style={styles.tableContainer}>
      <Heading style={styles.title}>Simular Actividades</Heading>
      <Text marginTop={8} fontSize={"lg"}>
        Este modulo es usado para simular actividad de usuarios en las
        películas.
      </Text>

      <HStack alignItems={"end"}>
        <FormControl flex={0.4}>
          <FormLabel htmlFor="quantity">Cantidad de vistas</FormLabel>
          <Input
            id="quantity"
            min={0}
            placeholder="Ingrese un numero"
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></Input>
        </FormControl>
        <FormControl flex={0.4}>
          <FormLabel htmlFor="date">Fecha</FormLabel>
          <Input
            id="date"
            type="date"
            onChange={(e) => {
              setSimulationDate(e.target.value);
            }}
          ></Input>
        </FormControl>
        <Button
          onClick={runViewSimulation}
          disabled={quantity <= 0 || !simulationDate}
        >
          <BiPlayCircle fontSize={20} />
          <Text marginLeft={2}>Simular</Text>
        </Button>
      </HStack>
    </div>
  );
}

export default Simulation;
