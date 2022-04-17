

import React, {useEffect} from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react'



const TableHeader = ({option}) => {


  return (
    <>
        <Thead>
            <Tr>    
                <Th> Codigo pelicula </Th>
                <Th> {(option === 'serie') ? 'Serie' : 'Pelicula'} </Th>
                <Th> Codigo estudio </Th>
                {(option === 'movie') ? <Th> Duration </Th> : '' }
                <Th> Fecha de publicacion </Th>
                <Th> Genero </Th>
                <Th> Codigo director </Th>
                <Th> Descripcion </Th>
                <Th> Link para imagen </Th>
                <Th> Categoria </Th>   
                {(option === 'serie') ? (<>
                <Th> Cantidad de episodios </Th>
                <Th> Cantidad de temporadas </Th>
                <Th> </Th>
                <Th> </Th></>) : <></>}
            </Tr>
        </Thead>    
    </>
  )
}

export default TableHeader
