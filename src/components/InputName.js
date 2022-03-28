import { EmailIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input, FormLabel } from '@chakra-ui/react';

const InputName = ({ fun, ...props }) => {

    const handleChange = (event) => {
        fun(event.target.value)
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

    };



    return (
        <div style={styles.outerContainer}>
            <FormLabel color={colors.primary}>{props.title}</FormLabel>
            <InputGroup>
                <Input onChange={handleChange} focusBorderColor={colors.primary} placeholder='Ingresa tu Nombre' />
            </InputGroup>

        </div>
    );

}

export default InputName;