import { Select } from '@chakra-ui/react'

const RolOption = (props) => {

    const colors = {
        primary: '#5E2BFF',
    }

    const handleChange = (event) => {
        props.fun(event.target.value)
    }

    return (

        <Select focusBorderColor={colors.primary} onChange={handleChange}>
            <option value='user'>Usuario</option>
            <option value='advertiser'>Advertiser</option>
            <option value='admin'>Administrador</option>
        </Select>
    )
}

export default RolOption