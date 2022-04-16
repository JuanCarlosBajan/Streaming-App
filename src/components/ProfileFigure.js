
import { VStack, Text } from '@chakra-ui/react';

function ProfileFigure({ name, onClick }) {

    const styles = {
        mainDiv: {
            'width': '120px',
            'height': '120px',
            'background': 'linear-gradient(135deg, rgba(33,0,143,0.2) 0%, rgba(94,43,255,0.5) 100%)',
            'borderRadius': '100%',
        }
    }
    return (
        <VStack spacing="18px" onClick={onClick}>
            <div style={styles.mainDiv}>

            </div>
            <Text fontWeight="bold">{name}</Text>
        </VStack>

    )
}

export default ProfileFigure