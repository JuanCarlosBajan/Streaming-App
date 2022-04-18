import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { getReport1, getReport3Actors, getReport3Director, getReport4, getReport5 } from "../../services/reports";
import { useEffect } from "react";

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [report1, setReport1] = useState([]);
  const [report4, setReport4] = useState(0);
  const [report5, setReport5] = useState([]);
  const [report3Directors, setReport3Directors] = useState([]);
  const [report3Actors, setReport3Actors] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const getReport4Data = async () => {
      const data = await getReport4();
      if (data.ok) {
        setReport4(data.report[0].count);
        console.log("set");
      } else {
        data.errors.forEach((element) => {
          toast({
            title: element,
            position: "top",
            status: "error",
            isClosable: true,
          });
        });
      }
    };
    getReport4Data();
  }, []);

  

  const getReport1Data = async () => {
    const data = await getReport1(
      startDate.toISOString(),
      endDate.toISOString()
    );
    if (data.ok) {
      setReport1(data.report);
    } else {
      data.errors.forEach((element) => {
        toast({
          title: element,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
    }
  };
  const getReport5Data = async () => {
    const data = await getReport5(date.toISOString());
    if (data.ok) {
      setReport5(data.report);
    } else {
      data.errors.forEach((element) => {
        toast({
          title: element,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
    }
  };

  const getReport3DataDirectors = async () => {
    const data = await getReport3Director();
    if (data.ok) {
      setReport3Directors(data.report);
    } else {
      data.errors.forEach((element) => {
        toast({
          title: element,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
    }
  };

  const getReport3DataDActors = async () => {
    const data = await getReport3Actors();
    if (data.ok) {
      setReport3Actors(data.report);
    } else {
      data.errors.forEach((element) => {
        toast({
          title: element,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
    }
  };

  return (
    <>
      {/* Reporte 1 */}
      <Box padding={12}>
        <Heading>Top 10 de géneros vistos</Heading>
        <Box marginTop={12}>
          <div className="pickers">
            <DatePicker
              placeholderText="Fecha inicial"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              placeholderText="Fecha final"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <Button onClick={getReport1Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Género</Th>
              <Th>Minutos Consumidos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report1.map((r, index) => {
              return (
                <Tr key={index}>
                  <Td>{r.genre}</Td>
                  <Td>{r.total}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 2 */}
      <Box padding={12}>
        <Heading>Cantidad de reproducciones por categoría</Heading>
        <Box marginTop={12}>
          <div className="pickers">
            <DatePicker
              placeholderText="Fecha inicial"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              placeholderText="Fecha final"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <Button>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Género</Th>
              <Th>Minutos Consumidos</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>action</Td>
              <Td>10</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 3 */}
      <Box padding={12}>
        <Heading>Top 10 de directores para cuentas estándar y avanzadas</Heading>
        <Button onClick={getReport3DataDirectors}>Generar Reporte</Button>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Nombre director</Th>
              <Th>Visitas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              report3Directors.map((element,index) => (
                <Tr key={index}>
                  <Td> {element.name} </Td>
                  <Td> {element.visitas} </Td>
                </Tr>
              ))

            }
          </Tbody>
        </Table>
      </Box>
      <Box padding={12}>
        <Heading>Top 10 de actores para cuentas estándar y avanzadas</Heading>
        <Button onClick={getReport3DataDActors}>Generar Reporte</Button>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Nombre Actor</Th>
              <Th>Visitas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              report3Actors.map((element,index) => (
                <Tr key={index}>
                  <Td> {element.name} </Td>
                  <Td> {element.visitas} </Td>
                </Tr>
              ))

            }
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 4 */}
      <Box padding={12}>
        <Heading>
          Cantidad de cuentas avanzadas que se han creado en los ultimos seis
          meses
        </Heading>

        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Cantidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{report4}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 5 */}
      <Box padding={12}>
        <Heading>Hora pico para una fecha</Heading>
        <Box marginTop={12}>
          <div className="pickers">
            <DatePicker
              placeholderText="Fecha"
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </div>
          <Button onClick={getReport5Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Hora</Th>
              <Th>Cantidad de conexiones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report5.map((r, index) => {
              return (
                <Tr key={index}>
                  <Td>{r.hora}</Td>
                  <Td>{r.t}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default Reports;
