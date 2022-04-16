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

  const styles = {
    outerContainer: {
        width: '100%',
        height: 'auto',
        padding: '10px',
        borderRadius: '10px',
    },
  }
    
  return (
    <>  
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Titulo </FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese titulo' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Estudio de grabación</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese el estudio de grabación' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Fecha de publicación</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese la fecha de publicación' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Género</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese género ' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Director</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese director' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Descripción</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese descripción ' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Link de la imagen de la portada</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese link de portada' />
        </div>
        
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>Categoria</FormLabel>
            <Input  focusBorderColor={colors.primary} placeholder='Ingrese categoria' />
        </div>
            
        
        {
            (option === 'serie') ? (
            <>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Cantidad de episodios</FormLabel>
                    <Input  focusBorderColor={colors.primary} placeholder='Ingrese cantidad de episodios' />
                </div>
        
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Cantidad de temporadas</FormLabel>
                    <Input  focusBorderColor={colors.primary} placeholder='Ingrese cantidad de temporadas' />
                </div>
                
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Info de episodios</FormLabel>
                    <Input  focusBorderColor={colors.primary} placeholder='Info de episodios' />
                </div>
            
            </> ) : ''
        }
      
    </>
  )
}

export default ModificationForm;
