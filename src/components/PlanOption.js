import { Select } from '@chakra-ui/react'

const PlanOption = ({ optionChange }) => {

    const colors = {
        primary: '#5E2BFF',
    }

    return (
        <Select focusBorderColor={colors.primary} onChange={(opt) => { console.log(opt.target.value) }}>
            <option value='basic'>Gratis</option>
            <option value='standard'>Standard</option>
            <option value='advanced'>Advanced</option>
        </Select>
    )
}

export default PlanOption