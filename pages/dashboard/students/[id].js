import React,{useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import {db} from '../../../firebase/clientApp.js';
import { useAuthHook } from '../../../context/AuthUserContext';
import {SignOut} from '../../../Components/FormComponents.js'
import {
    Flex,
    Heading,
    Text,
    Link,
    Avatar,
    Spacer,
    Box,
    Image,
    Button,
    

} from '@chakra-ui/react';
import {addDoc,getDoc,doc,setDoc,updateDoc,collection} from "firebase/firestore";



export default function dashboard() {
    const router = useRouter()
    const { id } = router.query
    
   const {user,loading}=useAuthHook();
   const [profile,setProfile] = useState({})
   // Listen for changes on loading and authUser, redirect if needed
   useEffect(async () => {
    if(user){
        const studentRef = doc(db,'students',user.email);
        const docSnap = await getDoc(studentRef);
        if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }
    
    
     
      
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
                        <Link _hover={{textDecor:'none'}} href={`/dashboard/student/${id}`}>
                        <Text>HOME</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Assessments</Text>
                        </Link>
                    </Flex>
                    <Flex>
                        <Link>
                        ICON
                        </Link>
                        <Link _hover={{textDecor:'none'}}>
                        <Text>Grades</Text>
                        </Link>
                    </Flex>
                    
                    
                </Flex>
                {/** avatar area*/}
                <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                    <Avatar my={2} src=""/>
                    <Text textAlign="center">{profile.name}</Text>
                    <SignOut/>
                </Flex>

            </Flex>
            </Flex>
            {/* column 2 main area */}
            <Flex flexDir="column" px="5" w='90%' Color="#000">
                <Box mt={24} >
                <Text fontSize="3xl" > Welcome back, {profile.name}!</Text>
                </Box>
               <Flex flexDir='wrap' px="24" pt="10">
                   {/** loop through the lessons */}
                   <Box w="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                   <Image src="/english.jpeg" />
                   <Box p='3' >
                       <Text>Uwase school of Languages</Text>
                   </Box>
                   <Box p='3'>
                       <Text fontSize="2xl">Getting Started with {profile.classes}</Text>
                   </Box>
                   <Box p='3'pt='36' >
                       <Button >Start Learning</Button>
                   </Box>
                   </Box>
                   <Spacer />
                   <Box w="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                   <Image src="/kiswahili.jpeg" />
                   <Box p='3'pt="12">
                       <Text>Uwase school of Languages</Text>
                   </Box>
                   <Box p='3' >
                       <Text fontSize="2xl">Getting Started with {'Swahili'}</Text>
                   </Box>
                   <Box p='3'pt='44' >
                       <Button >Start Learning</Button>
                   </Box>
                   </Box>
                   <Spacer />
                   <Box w="300px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                   <Image boxSize="300px" h='40'src="/francias.webp" />
                   <Box p='3' pt="12">
                       <Text >Uwase school of Languages</Text>
                   </Box>
                   <Box p='3'>
                       <Text fontSize="2xl">Getting Started with {'French'}</Text>
                   </Box>
                   <Box p='3' pt='44' >
                       <Button >Start Learning</Button>
                   </Box>
                   </Box>
               </Flex>
            </Flex>
            {/* column 3 right side nav, if needed */}
            <Flex>
                
            </Flex>
               
           
        </Flex>
    )
}
