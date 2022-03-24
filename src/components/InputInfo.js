import React, { useState } from 'react';
import { InputGroup, InputLeftElement, Input, FormLabel } from '@chakra-ui/react';
import { EmailIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

const InputInfo = (props) => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    //const [value, setValue] = React.useState('')
    const handleChange = (event) => {
        props.fun(event.target.value)
    }

    const colors = {
        primary: '#5E2BFF',
        secondary: '#0E131F',
        white: '#FFFF'
    }

    const styles = {
        outerContainer: {
            width: '100%',
            height: 'auto',
            padding: '10px',
            borderRadius: '10px',
        },
        leftElementPassword: {
            cursor: 'pointer',
        },
        leftElementEmail: {
            cursor: 'text',
        }

    };


    var icon = props.type === 'email' ? <EmailIcon color={colors.primary} /> :
        show ? <ViewIcon color={colors.primary} onClick={handleClick} /> :
            <ViewOffIcon color={colors.primary} onClick={handleClick} />;

    var type = props.type === 'email' ? 'text' : show ? 'text' : 'password';

    var cursor = props.type === 'email' ? styles.leftElementEmail : styles.leftElementPassword;

    return (
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>{props.title}</FormLabel>
            <InputGroup>

                <InputLeftElement
                    style={cursor}
                    pointerEvents={props.type === 'email' ? 'none' : 'pointer'}
                    children={icon}
                />
                <Input onChange={handleChange} focusBorderColor={colors.primary} type={type} placeholder={props.type === 'email' ? 'Ingresa tu Correo Electrónico' : 'Ingresa tu Contraseña'} />
            </InputGroup>

        </div>
    );

}

export default InputInfo;