import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Link,
Select} from '@chakra-ui/react';
import {Apply} from '../Components/FormComponents.js'


export default function Home() {
  return (
    <Flex 
    flexDir="column"
    w="100vw"
    h="100vh"
    >
      {/** column 1 */}
      <Flex
      h='100vh'
      w='30%'
      flexDir="column"
      
      >
        <Box maxW="32rem">
        <Heading
        fontSize="2xl"
        mt={20}
        pl={6}
        mb={2}
        letterSpacing="tight"
        >
          UWASE School Of Languages
        </Heading>
        <Text 
        fontSize="xl"
        pl={6}
        >
  Learn a new language Today!
  </Text>
        </Box>
        <Apply/>
        {/** redirect to login form for users */}
        <Text mt={6} pl={8}>Have an Account? <Link color="teal.500" href="/auth">Log In</Link></Text>
      </Flex>

    </Flex>
    
  )
}
