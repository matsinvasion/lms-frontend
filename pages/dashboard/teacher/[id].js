import React,{useEffect} from 'react';
import {useRouter} from 'next/router'
import { useAuthHook } from '../../../context/AuthUserContext';

import {
    Flex,
    Heading,
    Text,
    Link,
    Avatar,
    Spacer

} from '@chakra-ui/react'

export default function dasboard() {
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
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}} href={`/dashboard/teacher/${id}`}>
                        <Text>HOME</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Students</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Lessons</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Assignments</Text>
                        </Link>
                    </Flex >
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Quizes</Text>
                        </Link>
                    </Flex >
                    
                    
                </Flex>
                {/** avatar area*/}
                <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                    <Avatar my={2} src=""/>
                    <Text textAlign="center">Mark Musasizi</Text>
                    </Flex>

            </Flex>
            {/* column 2 main area */}
            <Flex>

            </Flex>
            {/* column 3 left side nav, if needed */}
            <Flex>
                
            </Flex>
                </Flex>
               
           
        </Flex>
    )
}
