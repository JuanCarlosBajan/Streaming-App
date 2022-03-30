import { Select } from '@chakra-ui/react'

const PlanOption = () => {

    const colors = {
        primary: '#5E2BFF',
    }

    return (
        <Select focusBorderColor={colors.primary}>
            <option value='option1'>Gratis</option>
            <option value='option2'>Standard</option>
            <option value='option3'>Advanced</option>
        </Select>
    )
}

export default PlanOption