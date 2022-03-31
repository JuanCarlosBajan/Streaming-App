import { Select } from '@chakra-ui/react'

const PlanOption = (props) => {

    const colors = {
        primary: '#5E2BFF',
    }

    const handleChange = (event) => {
        props.fun(event.target.value)
    }
        
    return (
        
        <Select focusBorderColor={colors.primary} onChange={handleChange}>
        <option value='basic'>basic</option>
        <option value='standard'>standard</option>
        <option value='advanced'>advanced</option>
        </Select>
    )
}

export default PlanOption