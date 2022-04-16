

import React from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react'


const TableHeader = ({option}) => {
  return (
    <>
        <Thead>
            <Tr>    
                <Th> {(option === 'serie') ? 'Serie' : 'Pelicula'} </Th>
                <Th> Estudio </Th>
                <Th> Fecha de publicacion </Th>
                <Th> Genero </Th>
                <Th> Nombre(s) director </Th>
                <Th> Apellidos director </Th>
                <Th> Descripcion </Th>
                <Th> Link para imagen </Th>
                <Th> Categoria </Th>   
                {(option === 'serie') ? (<>
                <Th> Cantidad de episodios </Th>
                <Th> Cantidad de temporadas </Th>
                <Th> Info de episodios </Th>
                <Th> </Th>
                <Th> </Th></>) : <></>}
            </Tr>
        </Thead>    
    </>
  )
}

export default TableHeader
