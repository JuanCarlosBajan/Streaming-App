import React from 'react'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'

const TableComponent = (props) => {


    return (

        <TableContainer>
            <Table variant='simple'>
                
                <Thead>
                    <Tr>
                        <Th> Nombre </Th>
                        <Th> Estudio </Th>
                        <Th> Fecha de publicación </Th>
                        <Th> Genero </Th>
                        <Th> Director </Th>
                        <Th> Descripcion </Th>
                        <Th> Link para imagen </Th>
                        <Th> Categoria </Th>
                        <Th>  </Th>

                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>

                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent;