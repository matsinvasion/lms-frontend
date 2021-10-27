import React,{useEffect} from 'react';
import {useRouter} from 'next/router'
import { useAuthHook } from '../../../context/AuthUserContext';

import {
    Flex,
    Heading,
    Text,
    Link,
    Avatar,
    Spacer,
    Box

} from '@chakra-ui/react'

export default function dashboard() {
    const router = useRouter()
    const { id } = router.query
    console.log(id)
   const {user,loading}=useAuthHook()
   console.log(user)
   // Listen for changes on loading and authUser, redirect if needed
   useEffect(() => {
    if (!loading && !user)
      console.log('user loged out')
  }, [user, loading])
    return (
        <Flex
        h={[null, null, "100vh"]}
        maxW="2000px"
        flexDir={["column", "column", "row"]}
        overflow="hidden"
       
        >
            {/** column 1 side nav */}
            <Flex
            w="15%"
            flexDir="column"
            alignItems="center"
            backgroundColor="#051E34"
            color="#fff"
            >
                <Flex 
                flexDir="column"
                justifyContent=""
                h='100vh'
                >
                      {/** Logo area in side nav */}
                <Flex
                flexDir="column"
                as="nav"
                >
                  <Heading
                  mt={50}
                  mb={100}
                  fontSize="4xl"
                  alignSelf="center"
                  letterSpacing="tight"
                  >
                      LMS
                  </Heading>  
                
                </Flex>
                
                {/** navigation Area*/}
                <Flex mb={400} flexDir="column" align="flex-start" justifyContent="center">
                    {/** contains column of icon and navigation */}
                    <Flex>
                        
                        ICON
                        <Link _hover={{textDecor:'none'}} href={`/dashboard/admin/${id}`}>
                        <Text>HOME</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        
                        ICON
                        <Link _hover={{textDecor:'none'}} href={`/dashboard/admin/applicants/${id}`}>
                        <Text>Applicants</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        
                        ICON
                        
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Students</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        
                        ICON
                        
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Teachers</Text>
                        </Link>
                    </Flex >
                    
                    
                </Flex>
                {/** avatar area*/}
                <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                    <Avatar my={2} src=""/>
                    <Text textAlign="center">Mark Musasizi</Text>
                </Flex>

            </Flex>
                </Flex>
         {/* column 2 main area */}
         <Flex
         flexDir="column"
         p="3%"
         w="100vw"
         color="#fff"
         >
                <Text color="blackAlpha.900">Hi User</Text>
            <Flex
            flexDir="wrap"
            mr={4}
            >
            <Box 
            mt={4} 
            mr={4}
            borderRadius="25px"
            w="30%"
            h="200px" 
            maxW="sm"
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            bgGradient="linear(to-t, #B57295, #29259A)">
            <Flex
            p="3"
            flexDir="column">
            <Text>New Applicants</Text>
           
            </Flex>
            {/** bottom board */}                
            <Flex
             p="3"
            mt={24}
            flexDir="column">
                <Text>50</Text>

            </Flex>

            </Box>
            <Box 
            mt={4}
            mr={4}
            borderRadius="25px"
            w="30%"
            h="200px" 
            maxW="sm" 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            bgGradient="linear(to-t, yellow.300, blue.500)">
                <Text>Students</Text>

            </Box>
            <Box 
            mt={4}
            borderRadius="25px"
            w="30%"
            h="200px" 
            maxW="sm" 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            bgGradient="linear(to-t, orange.300, pink.600)">
                <Text>Lessons</Text>

            </Box>
            </Flex>
            </Flex>
            
            {/* column 3 left side nav, if needed */}
            <Flex>
                
            </Flex>
               
           
        </Flex>
    )
}
