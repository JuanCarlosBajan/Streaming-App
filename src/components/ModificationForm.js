import { Button, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'

const ModificationForm = ({
    option,
    defaultTitle,
    defaultStudio,
    defaultPublishedAt,
    defaultGenre,
    defaultDirector,
    defaultDescription,
    defaultImage,
    defaultCategory,
    defaultDuration,
    onSend
}) => {

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

    const [title, setTitle] = useState('');
    const [studio, setStudio] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        if (defaultTitle) setTitle(defaultTitle);
        if (defaultStudio) setStudio(defaultStudio);
        if (defaultPublishedAt) setPublishedAt(defaultPublishedAt);
        if (defaultGenre) setGenre(defaultGenre);
        if (defaultDirector) setDirector(defaultDirector);
        if (defaultDescription) setDescription(defaultDescription);
        if (defaultImage) setCoverUrl(defaultImage);
        if (defaultCategory) setCategory(defaultCategory);
        if (defaultDuration) setDuration(defaultDuration);
    }, []);


    /**
     * Set send form
     */
    const sendForm = async () => {
        if (option === 'movie') {
            await onSend({
                title,
                studioCode: Number.parseInt(studio),
                genre,
                publishedAt,
                description,
                url: 'fds',
                directorCode: Number.parseInt(director),
                coverUrl,
                categories: category,
                duration: Number.parseInt(duration),
                rating: 5
            });
        }
    }

    return (
        <>
            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Titulo </FormLabel>
                <Input
                    focusBorderColor={colors.primary}
                    defaultValue={defaultTitle}
                    placeholder='Ingrese titulo'
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Estudio de grabación</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese el estudio de grabación'
                    onChange={(e) => { setStudio(e.target.value) }} />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Fecha de publicación</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese la fecha de publicación'
                    onChange={(e) => { setPublishedAt(e.target.value) }} />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Género</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese género '
                    onChange={(e) => { setGenre(e.target.value) }}
                />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Director</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese director'
                    onChange={(e) => { setDirector(e.target.value) }}
                />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Descripción</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese descripción '
                    onChange={(e) => { setDescription(e.target.value) }} />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Link de la imagen de la portada</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese link de portada'
                    onChange={(e) => { setCoverUrl(e.target.value) }}
                />
            </div>

            <div style={styles.outerContainer}>
                <FormLabel color={colors.primary}>Categoria</FormLabel>
                <Input focusBorderColor={colors.primary}
                    placeholder='Ingrese categoria'
                    onChange={(e) => { setCategory(e.target.value) }}
                />
            </div>
            {option === 'movie' ? (

                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Duracion</FormLabel>
                    <Input focusBorderColor={colors.primary}
                        type="number"
                        placeholder='Ingrese duracion'
                        onChange={(e) => { setDuration(e.target.value) }}
                    />
                </div>

            ) : ''}


            {
                (option === 'serie') ? (
                    <>
                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Cantidad de episodios</FormLabel>
                            <Input focusBorderColor={colors.primary} placeholder='Ingrese cantidad de episodios' />
                        </div>

                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Cantidad de temporadas</FormLabel>
                            <Input focusBorderColor={colors.primary} placeholder='Ingrese cantidad de temporadas' />
                        </div>

                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Info de episodios</FormLabel>
                            <Input focusBorderColor={colors.primary} placeholder='Info de episodios' />
                        </div>

                    </>) : ''
            }
            <div style={styles.innerContainer}>
                <Button
                    backgroundColor={colors.primary}
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    color={colors.white}
                    width='100%'
                    marginTop='10px'
                    _hover={{ bg: colors.primaryvariant1 }}
                    _active={{
                        bg: colors.primaryvariant2,
                        transform: 'scale(0.98)',
                        borderColor: colors.primaryvariant2,
                    }}
                    _focus={{
                        boxShadow:
                            '0 0 1px 2px transparent, 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                    onClick={sendForm}
                >
                    Aceptar
                </Button>
            </div>
        </>
    )
}

export default ModificationForm;
