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
  VStack,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import React, { useState } from "react";

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        <Heading>Top 10 de directores para cuentas estándar</Heading>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Nombre director</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Nombre</Td>
            </Tr>
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
              <Td>12</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 2 */}
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
    </>
  );
}

export default Reports;
