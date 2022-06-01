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
  TableContainer,
  Input,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import TableHeader from "../TableHeader";

import DatePicker from "react-datepicker";
import React, { useState } from "react";
import {
  getReport1,
  getReport2,
  getReport3Actors,
  getReport3Director,
  getReport4,
  getReport5,
  getReport6,
  getReport8,
  getReport9,
  getReport7,
  getReportEvent,
} from "../../services/reports";
import { useEffect } from "react";

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [report1, setReport1] = useState([]);
  const [report2, setReport2] = useState([]);
  const [report4, setReport4] = useState(0);
  const [report5, setReport5] = useState([]);
  const [report3Directors, setReport3Directors] = useState([]);
  const [report3Actors, setReport3Actors] = useState([]);
  const [report6, setReport6] = useState([]);
  const [report9, setReport9] = useState([]);
  const [report7, setReport7] = useState([]);
  const [report8, setReport8] = useState([]);
  const [reportEvents, setReportEvents] = useState([]);
  const [userInput, setUserInput] = useState("");
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
    getReport7Data();
    getReportEvents();
  }, []);

  const getReportEvents = async () => {
    const data = await getReportEvent();
    if (data.ok) {
      setReportEvents(data.report);
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

  const getReport2Data = async () => {
    const data = await getReport2(
      startDate.toISOString(),
      endDate.toISOString()
    );
    if (data.ok) {
      setReport2(data.report);
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

  /**
   * Reporte 06
   */
  const getReport6Data = async () => {
    const data = await getReport6(userInput);
    if (data.ok) {
      setReport6(data.report);
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

  /**
   * Reporte 08
   */
  const getReport8Data = async () => {
    const data = await getReport8(
      startDate.toISOString(),
      endDate.toISOString()
    );
    if (data.ok) {
      setReport8(data.report);
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

  /**
   * Reporte 09
   */
  const getReport9Data = async () => {
    const data = await getReport9(
      startDate.toISOString(),
      endDate.toISOString()
    );

    if (data.ok) {
      setReport9(data.report);
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

  /** Reporte 07
   */
  const getReport7Data = async () => {
    const data = await getReport7();
    if (data.ok) {
      setReport7(data.report);
      console.log("hola");
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
          <Button onClick={getReport2Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Categoria</Th>
              <Th>Plan</Th>
              <Th>Vistas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report2.map((element, index) => (
              <Tr key={index}>
                <Td> {element.category} </Td>
                <Td> {element.plan} </Td>
                <Td> {element.views} </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* Reporte 3 */}
      <Box padding={12}>
        <Heading>
          Top 10 de directores para cuentas estándar y avanzadas
        </Heading>
        <Button onClick={getReport3DataDirectors}>Generar Reporte</Button>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Nombre director</Th>
              <Th>Visitas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report3Directors.map((element, index) => (
              <Tr key={index}>
                <Td> {element.name} </Td>
                <Td> {element.visitas} </Td>
              </Tr>
            ))}
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
            {report3Actors.map((element, index) => (
              <Tr key={index}>
                <Td> {element.name} </Td>
                <Td> {element.visitas} </Td>
              </Tr>
            ))}
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

      {/* Reporte 1.2.1 */}
      <Box padding={12}>
        <Heading>
          Top 5 de peliculas vistas cada hora entre 9 a.m. y 1 p.m.
        </Heading>
        <Box marginTop={12}>
          <div className="pickers">
            <Input
              focusBorderColor={"#5E2BFF"}
              placeholder="Ingresa el mes"
              value={userInput}
              type={"number"}
              width="150px"
              onChange={(e) => setUserInput(e.target.value)}
            ></Input>
          </div>
          <Button onClick={getReport6Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Codigo</Th>
              <Th>Titulo</Th>
              <Th>Cantidad de vistas</Th>
              <Th>Hora</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report6.map((row) => (
              <Tr key={row.moviecode}>
                <Td>{row.moviecode}</Td>
                <Td>{row.title}</Td>
                <Td>{row.views}</Td>
                <Td>{row.hour}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Reporte 2.2 */}
      <Box padding={12}>
        <Heading>Top 10 de los términos que los usuarios buscan</Heading>

        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Término</Th>
              <Th>Cantidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report7.map((r, index) => {
              return (
                <Tr key={index}>
                  <Td>{r.search}</Td>
                  <Td>{r.search_count}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {/* Reporte 3.2 */}
      <Box padding={12}>
        <Heading>
          Top 5 de los administradores que más modificaciones realizan en las
          cuentas de usuario
        </Heading>
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
          <Button onClick={getReport8Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Codigo de administrador</Th>
              <Th>Cantidad de operaciones</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report8.map((r, index) => {
              return (
                <Tr key={index}>
                  <Td>{r.admincode}</Td>
                  <Td>{r.ops_quantity}</Td>
                  <Td>{r.ops_date}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {/* Reporte 4.2 */}
      <Box padding={12}>
        <Heading>
          Top 20 de películas que comenzaron a verse pero que llevan más de 20
          días sin finalizarse
        </Heading>
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
          <Button onClick={getReport9Data}>Generar Reporte</Button>
        </Box>
        <Table marginTop={12}>
          <Thead>
            <Tr>
              <Th>Pelicula</Th>
              <Th>Cantidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report9.map((r, index) => {
              return (
                <Tr key={index}>
                  <Td>{r.title}</Td>
                  <Td>{r.count}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {/*Bitacora*/}
      <Box padding={12}>
        <Heading>Bitacora</Heading>
        <TableContainer>
          <Table variant="simple">
            <TableHeader option={"events"} />
            <Tbody>
              {reportEvents.map((element, index) => (
                <Tr key={index}>
                  <Td> {element.table_name} </Td>
                  <Td> {element.admin_id} </Td>
                  <Td> {element.admin_name} </Td>
                  <Td> {element.operation} </Td>
                  <Td> {element.operation_date} </Td>
                  <Td> {element.row_id} </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Reports;
