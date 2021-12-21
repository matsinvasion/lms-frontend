import React,{useEffect,useState} from 'react';
import {useRouter} from 'next/router'
import { useAuthHook } from '../../../context/AuthUserContext';
import { CreateQuiz} from '../../../Components/FormComponents';
import { createdQuiz } from '../../../Components/Students/stateUtil';

import {
    Flex,
    Box,
    Heading,
    Text,
    Link,
    Avatar,
    Button,
    Spacer,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,

} from '@chakra-ui/react'
import { useFormik } from "formik";
import { db } from '../../../firebase/clientApp.js';
import { collection, getDocs,getDoc,deleteDoc, query, where,doc } from "firebase/firestore";
import {useRecoilValue} from 'recoil';


export default function dashboard() {
    const router = useRouter()
    const { id } = router.query
   const {user,loading}=useAuthHook()
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = React.useRef();
   const [assignments,setAssignments]=useState([])
   const deleteQuiz = (param) => async (e)=>{
    console.log(param)
    await deleteDoc(doc(db, "quizes",param));
    //remove deleted quiz
    const newList = assignments.filter((assignment)=>assignment.id !==id)
   setAssignments(newList)
   console.log(assignments.length)
    
   }
   // Listen for changes on loading and authUser, redirect if needed
   useEffect(async() => {
    if (!user && !loading){
      console.log('user logged out')
     }else{
      try{
        
        const quizes = await getDocs(collection(db,'quizes'));
         quizes.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
           setAssignments(assignments=>[...assignments,doc])
           
           
         });
       }catch(err){
         console.log(err)
       }
       
     }
     
    }, [user])
    return (
        <Flex
        h={[null, null, "100vh"]}
        maxW="2000px"
        flexDir={["column", "column", "row"]}
        
       
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
                        <Link ref={btnRef} onClick={onOpen} _hover={{textDecor:'none'}}>
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
            </Flex>
            {/* column 2 main area */}
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size='lg'
                
                >
                    <DrawerOverlay>
                        <DrawerContent overflow='scroll'>
                            <DrawerCloseButton/>
                            <DrawerHeader>Create Quiz</DrawerHeader>
                            <CreateQuiz onClose={onClose} />
                            
                        </DrawerContent>
                    </DrawerOverlay>

                </Drawer>
            <Flex
            p="3%"
            w="100vw"
            
            direction="column">
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
            <Text color="#fff">Students</Text>
           
            </Flex>
            {/** bottom board */}                
            <Flex
             p="3"
            mt={24}
            flexDir="column">
                <Text color="#fff">Overall</Text>

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
                <Text color="#fff">Lessons</Text>

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
                <Text color="#fff">Assignments</Text>

            </Box>
            </Flex>
                {/** STUDENT PERFORMANCES */}
              <Flex
              direction="wrap"
              w="100vw"
              mt={8}
              >
                <Flex
                direction="column"
                
                >
                  <Heading fontSize="2xl" color="000">
                    Top Students
                  </Heading>
                <Box
                mt={4}
                borderRadius="25px"
                w="500px"
                h="90px" 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow="md"
                bg="white"
                >
                    <Flex direction="wrap">
                    <Avatar my={3} mx="4" src="/girl.jpeg"/>
                    <Flex direction="column">
                      <Text fontSize="lg" mt={3} >Joyce Ngabire</Text>
                    <Text fontSize="sm" color="gray.600">English, French</Text>
                      </Flex>
                      <Button mx='10%' mt={6}colorScheme="teal" size="sm">View Grades</Button>
                    </Flex>
                    
                 
                </Box>
                
                <Box
                mt={4}
                borderRadius="25px"
                w="500px"
                h="90px" 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow="md"
                bg="white"
                >
                  
                    <Flex direction="wrap">
                    <Avatar my={3} mx="4" src="/girl.jpeg"/>
                    <Flex direction="column">
                      <Text fontSize="lg" mt={3} >Joyce Ngabire</Text>
                    <Text fontSize="sm" color="gray.600">English, French</Text>
                      </Flex>
                      <Button mx='10%' mt={6}colorScheme="teal" size="sm">View Grades</Button>
                    </Flex>
      
                </Box>
                </Flex>
                
                <Flex
                direction="column"
                
                ml="10%"
                >
                   <Heading fontSize="2xl"color="000">
                    Least Performaning
                  </Heading>
                  <Box
                mt={4}
                borderRadius="25px"
                w="500px"
                h="90px" 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow="md"
                bg="white"
                >
                    <Flex direction="wrap">
                    <Avatar my={3} mx="4" src="/girl.jpeg"/>
                    <Flex direction="column">
                      <Text fontSize="lg" mt={3} >Joyce Ngabire</Text>
                    <Text fontSize="sm" color="gray.600">English, French</Text>
                      </Flex>
                      <Button mx='10%' mt={6}colorScheme="teal" size="sm">View Grades</Button>
                    </Flex>
                    
                 
                </Box>
                
                <Box
                mt={4}
                borderRadius="25px"
                w="500px"
                h="90px" 
                maxW="sm" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow="md"
                bg="white"
                >
                  
                    <Flex direction="wrap">
                    <Avatar my={3} mx="4" src="/girl.jpeg"/>
                    <Flex direction="column">
                      <Text fontSize="lg" mt={3} >Joyce Ngabire</Text>
                    <Text fontSize="sm" color="gray.600">English, French</Text>
                      </Flex>
                      <Button mx='10%' mt={6}colorScheme="teal" size="sm">View Grades</Button>
                    </Flex>
      
                </Box>

                </Flex>
                
                
              </Flex>
              {/** Quiz stats */}
              <Heading mt={8} fontSize="2xl" color="black">Assignments</Heading>
              
              {assignments.length > 0 ?
              <Flex
              
              direction="column"
              >
              <Heading mt={6} pl={6} fontSize="lg" color="black">English</Heading>
              <Flex
              direction="wrap"
              >

                <Table>
                  <Thead>
                    <Tr>
                      <Th>Tag</Th>
                      <Th>Active</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    
                    {assignments.map((assignment,index)=>
                      
                      (
                        
                        <Tr key={index}>
                          
                        <Td>{assignment.data().Tag}</Td>
                        <Td>
                         <input type="checkbox"/>
                        </Td>
                        <Td>
                          <Button colorScheme="red" size="md" onClick={deleteQuiz(assignment.id)}>Delete</Button>
                        </Td>
                      </Tr>
  
      )
                    )}
                    
                    
                  </Tbody>
                </Table>
              </Flex>

              </Flex>
              :
              <Text>Please Add assignments</Text>
              }
              
            </Flex>
            {/* column 3 left side nav, if needed */}
            <Flex>
                
            </Flex>
           
        </Flex>
    )
}
