import React, { useState } from 'react'
import { VStack, Text } from '@chakra-ui/react';

import { colors } from '../utils/colors'

function ProfileFigure({ name }) {

    const styles = {
        mainDiv: {
            'width': '150px',
            'height': '150px',
            'background': 'linear-gradient(135deg, rgba(33,0,143,0.2) 0%, rgba(94,43,255,0.5) 100%)',
            'borderRadius': '100%',
        }
    }
    return (
        <VStack spacing="18px">
            <div style={styles.mainDiv}>

            </div>
            <Text fontWeight="bold">{name}</Text>
        </VStack>

    )
}

export default ProfileFigure