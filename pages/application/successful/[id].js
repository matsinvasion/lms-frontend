import React from 'react'
import {Flex,
        Alert,
        AlertIcon,
        AlertTitle,
        AlertDescription} from '@chakra-ui/react';


export default function applicationSuccess() {
    return (
        <Flex
        flexDir="column"
        mt={50}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        >
            <Alert
                        status="success"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                        >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                            Application submitted!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                            Thanks for submitting your application. Our team will get back to you soon.
                        </AlertDescription>
                    </Alert>
        </Flex>
    )
}
