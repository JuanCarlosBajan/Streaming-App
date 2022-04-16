import {FormLabel, Input, InputGroup } from "@chakra-ui/react";
import React from 'react'

const ModificationForm = ({option}) => {

  const colors = {
        primary: '#5E2BFF',
        primaryvariant1: '#531FFF',
        primaryvariant2: '#3400E0',
        secondary: '#0E131F',
        white: '#FFFF',
        gradient: 'linear-gradient(135deg, rgba(33,0,143,1) 0%, rgba(94,43,255,0.6811099439775911) 100%)',
        soft: '#d9cbf9'
  }
    
  return (
    <>
        <FormLabel color={colors.primary}>Titulo </FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese titulo' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Estudio de grabación</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese el estudio de grabación' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Fecha de publicación</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese la fecha de publicación' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Género</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese género ' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Director</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese director' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Descripción</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese descripción ' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Link de la imagen de la portada</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese link de portada' />
        </InputGroup>
        <br/>
        <FormLabel color={colors.primary}>Categoria</FormLabel>
        <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese categoria' />
        </InputGroup>
        
        {
            (option === 'serie') ? (
            <>
            <FormLabel color={colors.primary}>Cantidad de episodios</FormLabel>
            <InputGroup>
                <Input  focusBorderColor={colors.primary} placeholder='Ingrese cantidad de episodios' />
            </InputGroup>
            <br/>
            <FormLabel color={colors.primary}>Cantidad de temporadas</FormLabel>
            <InputGroup>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese cantidad de temporadas' />
            </InputGroup>
            <br/>
            <FormLabel color={colors.primary}>Info de episodios</FormLabel>
            <InputGroup>
                <Input  focusBorderColor={colors.primary} placeholder='Info de episodios' />
            </InputGroup>
            </> ) : ''
        }
      
    </>
  )
}

export default ModificationForm;
