import { Button, FormLabel, Input, InputGroup, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'

const ModificationForm = ({
    option,
    defaultContent,
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
    const [url, setUrl] = useState('');
    const [season, setSeason] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState(0);
    const [episodeCount, setEpisodeCount] = useState(0);
    const [seasonCount, setSeasonCount] = useState(0);

    // VARIABLES PARA USUARIOS

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [active, setActive] = useState(true);
    const [plan, setPlan] = useState('');
    const [role, setRole] = useState('');


    useEffect(() => {

        if (defaultContent.name) { setTitle(defaultContent.name) };
        if (defaultContent.title) { setTitle(defaultContent.title) };
        if (defaultContent.studioCode) setStudio(defaultContent.studioCode);
        if (defaultContent.datePublished) setPublishedAt(defaultContent.datePublished);
        if (defaultContent.publishedAt) setPublishedAt(defaultContent.publishedAt);
        if (defaultContent.genre) setGenre(defaultContent.genre);
        if (defaultContent.director) setDirector(defaultContent.director);
        if (defaultContent.description) setDescription(defaultContent.description);
        if (defaultContent.coverUrl) setCoverUrl(defaultContent.coverUrl);
        if (defaultContent.url) setUrl(defaultContent.url);
        if (defaultContent.season) setSeason(defaultContent.season);
        if (defaultContent.categories) setCategory(defaultContent.categories);
        if (defaultContent.duration) { setDuration(defaultContent.duration); };
        if (defaultContent.episodeCount) { setEpisodeCount(defaultContent.episodeCount); };
        if (defaultContent.seasonCount) { setSeasonCount(defaultContent.seasonCount); };
        if (defaultContent.user) { setUser(defaultContent.user); };
        if (defaultContent.email) { setEmail(defaultContent.email); };
        if (defaultContent.name) { setName(defaultContent.name); };
        if (defaultContent.lastName) { setLastName(defaultContent.lastName); };
        if (defaultContent.active) { setActive(defaultContent.active); };
        if (defaultContent.plan) { setPlan(defaultContent.plan); };
        if (defaultContent.role) { setRole(defaultContent.role); };
    }, []);


    /**
     * Set send form
     */
    const sendForm = async () => {
        if (option === 'movie') {
            await onSend({
                movieCode: defaultContent.movieCode ?? undefined,
                title,
                studio: studio,
                genre,
                publishedAt,
                description,
                url,
                director,
                coverUrl,
                categories: category,
                duration: Number.parseInt(duration),
                rating: 5
            });
        } else if (option === 'serie') {
            await onSend({
                seriesCode: defaultContent.seriesCode ?? undefined,
                title,
                studio: studio,
                genre,
                publishedAt,
                description,
                director,
                coverUrl,
                categories: category,
                episodeCount: episodeCount,
                seasonCount: seasonCount,
                rating: 5
            });
        } else if (option === "addEpisode") {
            await onSend({
                name: title,
                datePublished: publishedAt,
                description,
                url,
                duration: Number.parseInt(duration),
                season
            });
        } else if (option === "advertisers") {
            await onSend({
                advertiserCode: defaultContent.advertiserCode,
                name: title,
            });
        } else if (option === "users") {
            await onSend({
                user,
                email,
                name,
                lastName,
                active,
                plan,
                role,
                userCode: defaultContent.userCode,
            });
        }
    }

    return (
        <>

            {
                option === 'advertisers' ?
                    <>
                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Nombre </FormLabel>
                            <Input
                                focusBorderColor={colors.primary}
                                defaultValue={defaultContent.name}
                                placeholder='Ingrese nombre del anunciante'
                                onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                    </>
                    : ''
            }

            {option === 'addEpisode' ?
                <>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Titulo </FormLabel>
                        <Input
                            focusBorderColor={colors.primary}
                            defaultValue={defaultContent.title}
                            placeholder='Ingrese titulo'
                            onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Temporada </FormLabel>
                        <Input
                            focusBorderColor={colors.primary}
                            defaultValue={defaultContent.season}
                            placeholder='Ingrese temporada'
                            onChange={(e) => { setSeason(e.target.value) }} />
                    </div>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Duracion</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.duration}
                            type="number"
                            placeholder='Ingrese duracion'
                            onChange={(e) => { setDuration(e.target.value) }}
                        />
                    </div>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Fecha de publicación</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.publishedAt}
                            placeholder='Ingrese la fecha de publicación'
                            onChange={(e) => { setPublishedAt(e.target.value) }} />
                    </div>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>URL</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.url}
                            placeholder='Ingrese la URL'
                            onChange={(e) => { setUrl(e.target.value) }} />
                    </div>
                </>
                : ''}
            {option === 'movie' || option === 'serie' ?
                <>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Titulo </FormLabel>
                        <Input
                            focusBorderColor={colors.primary}
                            defaultValue={defaultContent.title}
                            placeholder='Ingrese titulo'
                            onChange={(e) => { setTitle(e.target.value) }} />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Estudio de grabación</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.studio}
                            placeholder='Ingrese el estudio de grabación'
                            onChange={(e) => { setStudio(e.target.value) }} />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Fecha de publicación</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.publishedAt}
                            placeholder='Ingrese la fecha de publicación'
                            onChange={(e) => { setPublishedAt(e.target.value) }} />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Género</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            placeholder='Ingrese género '
                            defaultValue={defaultContent.genre}
                            onChange={(e) => { setGenre(e.target.value) }}
                        />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Director</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            placeholder='Ingrese director'
                            defaultValue={defaultContent.director}
                            onChange={(e) => { setDirector(e.target.value) }}
                        />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Descripción</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            placeholder='Ingrese descripción '
                            defaultValue={defaultContent.description}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </div>


                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Link de la imagen de la portada</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            placeholder='Ingrese link de portada'
                            defaultValue={defaultContent.coverUrl}
                            onChange={(e) => { setCoverUrl(e.target.value) }}
                        />
                    </div>

                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Categoria</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            placeholder='Ingrese categoria'
                            defaultValue={defaultContent.categories}
                            onChange={(e) => { setCategory(e.target.value) }}
                        />
                    </div>
                </>
                : ''}

            {option === 'movie' ? (

                <>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>Duracion</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.duration}
                            type="number"
                            placeholder='Ingrese duracion'
                            onChange={(e) => { setDuration(e.target.value) }}
                        />
                    </div>
                    <div style={styles.outerContainer}>
                        <FormLabel color={colors.primary}>URL</FormLabel>
                        <Input focusBorderColor={colors.primary}
                            defaultValue={defaultContent.url}
                            placeholder='Ingrese url'
                            onChange={(e) => { setUrl(e.target.value) }}
                        />
                    </div>
                </>


            ) : ''}

            {option === 'users' ? (<>

                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Usuario </FormLabel>
                    <Input
                        focusBorderColor={colors.primary}
                        defaultValue={defaultContent.user}
                        placeholder='Ingrese Usuario'
                        onChange={(e) => { setUser(e.target.value) }} />
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Correo </FormLabel>
                    <Input
                        focusBorderColor={colors.primary}
                        defaultValue={defaultContent.email}
                        placeholder='Ingrese Correo'
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Nombre</FormLabel>
                    <Input focusBorderColor={colors.primary}
                        defaultValue={defaultContent.name}
                        placeholder='Ingrese Nombre'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Apellido</FormLabel>
                    <Input focusBorderColor={colors.primary}
                        defaultValue={defaultContent.lastName}
                        placeholder='Ingrese Apellido'
                        onChange={(e) => { setLastName(e.target.value) }} />
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Activo</FormLabel>
                    <Select
                        value={active}
                        onChange={(e) => { setActive(e.target.value) }}
                    >
                        <option value={true}>Activo</option>
                        <option value={false}>No Activo</option>
                    </Select>
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Plan</FormLabel>
                    <Select
                        value={plan}
                        onChange={(e) => { setPlan(e.target.value) }}
                    >
                        <option value={'basic'}>Basico</option>
                        <option value={'standard'}>Estandard</option>
                        <option value={'advanced'}>Avanzado</option>
                    </Select>
                </div>
                <div style={styles.outerContainer}>
                    <FormLabel color={colors.primary}>Rol</FormLabel>
                    <Select
                        value={role}
                        onChange={(e) => { setRole(e.target.value) }}
                    >
                        <option value={'user'}>Usuario</option>
                        <option value={'advertiser'}>Advertiser</option>
                        <option value={'admin'}>Administrador</option>
                    </Select>
                </div>

            </>) : ''}


            {
                (option === 'serie') ? (
                    <>
                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Cantidad de episodios</FormLabel>
                            <Input focusBorderColor={colors.primary}
                                placeholder='Ingrese cantidad de episodios'
                                defaultValue={defaultContent.episodeCount}
                                onChange={(e) => { setEpisodeCount(e.target.value); }} />
                        </div>

                        <div style={styles.outerContainer}>
                            <FormLabel color={colors.primary}>Cantidad de temporadas</FormLabel>
                            <Input focusBorderColor={colors.primary} placeholder='Ingrese cantidad de temporadas'
                                defaultValue={defaultContent.seasonCount}
                                onChange={(e) => { setSeasonCount(e.target.value) }} />
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
