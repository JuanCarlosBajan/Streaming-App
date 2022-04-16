import React from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { downgrade } from "../../services/user";

const UserConfig = ({user = {}}) => {

    

    return (
        <Button colorScheme='blue'

        onClick={() => {downgrade(user.userCode)}}

        >Downgrade Account</Button>
    )
};

export default UserConfig;