

import React, {useState} from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer, background} from '@chakra-ui/react'
import TableComponent from "../TableComponent"
import { BiPencil, BiTrash } from "react-icons/bi";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";


const ManageContent = () => {
    
    const [option, setOption] = useState('');

    const colors = {
        primary: '#5E2BFF',
        primaryvariant1: '#531FFF',
        primaryvariant2: '#3400E0',
        secondary: '#0E131F',
        white: '#FFFF',
        gradient: 'linear-gradient(135deg, rgba(33,0,143,1) 0%, rgba(94,43,255,0.6811099439775911) 100%)',
        soft: '#d9cbf9'
    }

    const styles = {
        tableContainer: {
            padding: '40px'
        }
    }
  return (
    <>
    <div style={styles.tableContainer}>

        <Menu>
          <MenuButton  as={Button} rightIcon={<ChevronDownIcon />}>
            Opciones
          </MenuButton>
          <MenuList zIndex={10000}>
            <MenuItem 
            onClick={() => {
                setOption('serie');
              }}>
                Administrar series
            </MenuItem>
            <MenuItem 
            onClick={() => {
            setOption('movie');
            }}>
                Administrar peliculas
            </MenuItem>
          </MenuList>
        </Menu>
        <br></br>
        <br></br>

        { (option === 'movie') ?

            (<TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th> Pelicula </Th>
                            <Th> Estudio </Th>
                            <Th> Fecha de publicacion </Th>
                            <Th> Genero </Th>
                            <Th> Nombre(s) director </Th>
                            <Th> Apellidos director </Th>
                            <Th> Descripcion </Th>
                            <Th> Link para imagen </Th>
                            <Th> Categoria </Th>
                            <Th>  </Th>
                            <Th>  </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td> Amazing Spiderman </Td>
                            <Td>Walt Disney Pictures</Td>
                            <Td> 2010-10-10T06:00:00.000Z </Td>
                            <Td> Action </Td>
                            <Td> Unkrich </Td>
                            <Td> Lee </Td>
                            <Td> test </Td>
                            <Td> https://es.web.img3.acsta.net/medias/nmedia/18/84/50/16/20084857.jpg </Td>
                            <Td> pg </Td>
                            <Td> <a> <BiPencil/></a> </Td>
                            <Td> <a> <BiTrash/></a></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>) :

            (<TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th> serie </Th>
                            <Th> Estudio </Th>
                            <Th> Fecha de publicacion </Th>
                            <Th> Genero </Th>
                            <Th> Nombre(s) director </Th>
                            <Th> Apellidos director </Th>
                            <Th> Descripcion </Th>
                            <Th> Link para imagen </Th>
                            <Th> Categoria </Th>
                            <Th> Cantidad de episodios </Th>
                            <Th> Cantidad de temporadas </Th>
                            <Th> Info de episodios </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td> The Big Bang Theory  </Td>
                            <Td> Walt Disney Pictures</Td>
                            <Td> 2010-10-10T06:00:00.000Z </Td>
                            <Td> Comedy </Td>
                            <Td> Unkrich </Td>
                            <Td> Lee </Td>
                            <Td> test </Td>
                            <Td> https://es.web.img3.acsta.net/medias/nmedia/18/84/50/16/20084857.jpg </Td>
                            <Td> pg </Td>
                            <Td> 279 </Td>
                            <Td> 12 </Td>
                            <Td> Infoo </Td>
                            <Td>  <BiPencil/>  </Td>
                            <Td>  <BiTrash/> </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>)
        }
        
      </div>
    </>
  )
}

export default ManageContent;
