import React, {useEffect} from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from '@chakra-ui/react'



const TableHeader = ({option}) => {

  const THeadMaker = (option) => {
    if(option === 'movie'){
      return( 
        <Thead>
          <Tr>
            <Th> Codigo Pelicula </Th>
            <Th> Nombre Pelicula </Th>
            <Th> Codigo estudio </Th>
            <Th> Duracion </Th> 
            <Th> Fecha de publicacion </Th>
            <Th> Genero </Th>
            <Th> Director </Th>
            <Th> Descripcion </Th>
            <Th> Link portada </Th>
            <Th> Categoria </Th>
            <Th> </Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
      )
    }
    if(option === 'serie'){
      return(
        <Thead>
          <Tr>
            <Th> Codigo Serie </Th>
            <Th> Nombre Serie </Th>
            <Th> Codigo estudio </Th>
            <Th> Fecha de publicacion </Th>
            <Th> Genero </Th>
            <Th> Director </Th>
            <Th> Descripcion </Th>
            <Th> Link portada </Th>
            <Th> Categoria </Th>
            <Th> Cantidad de episodios </Th>
            <Th> Cantidad de temporadas </Th>
            <Th> </Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
      )
    }
    if(option === 'advertisers'){
      return(
        <Thead>
          <Tr>
            <Th> Codigo del Anunciante </Th>
            <Th> Nombre del Anunciante </Th>
            <Th> </Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
      )
    }
    if(option === 'users'){
      return(
        <Thead>
          <Tr>
            <Th> Codigo de Usuario </Th>
            <Th> Usuario </Th>
            <Th> Correo </Th>
            <Th> Password </Th>
            <Th> Nombre </Th>
            <Th> Apellido </Th>
            <Th> Activo </Th>
            <Th> Plan </Th>
            <Th> Rol </Th>
          </Tr>
        </Thead>
      )
    }
  }

  return (
    <>
      {THeadMaker(option)}
    </>
  )
}

export default TableHeader
