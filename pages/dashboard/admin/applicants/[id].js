import React,{useState,useEffect} from 'react';
import {Flex,Table,
    TableCaption,
    Text,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    useDisclosure,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Spacer,
    Input,
    Box,
    Checkbox
} from '@chakra-ui/react';
import { Timestamp,collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../../../firebase/clientApp.js';
import CreateStudent from '../../../../Components/Students/CreateStudent.js';
import { useAuthHook } from '../../../../context/AuthUserContext'
import {useRouter} from 'next/router'
export default function applicants() {
    const [applicants,setApplicants] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const {user,loading}=useAuthHook() // get current user
    const url='http://localhost:3000/decodetoken';
    const [isAdmin,setIsAdmin] = useState(false);
    const router = useRouter()
    //use effect should re-render whenever a new applicant has applied
    useEffect(async ()=>{
          //decode token, user must be admin
          
    if(user){
        //only admins can view this page
        if(user.uid!=router.query.id){
            alert('not authorized to view page.')
            router.push('/auth')
        }else {
            const querySnapshot = await getDocs(collection(db, "applicants"));
        querySnapshot.forEach((doc) => {
            
            // doc.data() is never undefined for query doc snapshots
            setApplicants(applicants => [...applicants, doc.data()]);
          });
        user.getIdToken().then((idToken)=>{
            try{
                
                fetch(url,{
                    method:'GET',
                    headers:{
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${idToken}`,
                    }
        
                }).then((res)=>{
                    return res.json()
                }).
                then(result => {
      
                    setIsAdmin(result.admin)
                    
                  })
                .catch((err)=>{
                    err.message
                })
                //verify role here before redirecting to specific dashboard  
            }
            catch (err){
                console.log(err)
        
            }

        })
        }
        
            
        
    }else{
        
        console.log('loading')
    }
        
    },[user])
    return (
        <>
        <Flex 
        flexDir="column"
        w='100vw'
        overflow="hidden"
        >
            {/**Column 1 */}
            <Flex
            flexDir=""
            w='70%'
            
            >
                <Table variant="striped" colorScheme="teal">
  <TableCaption>List of Applicants</TableCaption>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Date of Registration</Th>
      <Th isNumeric>Phone Number</Th>
    </Tr>
  </Thead>
  {applicants.map(applicant=>{
      return(
          <>
      <Tbody key={applicant.id}>
      <Tr>
        <Td>{applicant.fullName}</Td>
        <Td>{applicant.applied_at.toDate().toDateString()}</Td>
        <Td isNumeric>{applicant.phoneNumber}</Td>
        <Td><Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        View
      </Button></Td>
      </Tr>
    </Tbody>
    <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={btnRef}
    size='md'
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Verify Applicant</DrawerHeader>

      <DrawerBody>
          <Flex flexDir="column">
          <Flex flexDir="wrap">
            <Flex flexDir="column">
                <Box pb={4}>
                <Text fontweight="bold"fontSize="xl">Full Name:</Text>
                <Text fontSize="2xl">{applicant.fullName}</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">Email:</Text>
                <Text fontSize="2xl">{applicant.emailAddress}</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">Registration Date</Text>
                <Text fontSize="2xl">{applicant.applied_at.toDate().toDateString()}</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">Education Level</Text>
                <Text fontSize="2xl">{applicant.educationLevel}</Text>
                </Box>
                
                <Box pb={4}>
                <Text fontSize="xl">Uploads</Text>
                </Box>
                
            </Flex>
            <Spacer />
            <Flex flexDir="column">
                <Box pb={4}>
                <Text fontSize="xl">photo</Text>
                <Text fontSize="2xl">photo goes here</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">photo</Text>
                <Text fontSize="2xl">photo goes here</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">Phone number</Text>
                <Text fontSize="2xl">{applicant.phoneNumber}</Text>
                </Box>
                <Box pb={4}>
                <Text fontSize="xl">Residence</Text>
                <Text fontSize="2xl">{applicant.countryOfResidence}</Text>
                </Box>

            
            </Flex>

        </Flex>
        <Box>
            <Checkbox>Interviewed</Checkbox>
        </Box>
          </Flex>
        
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Deny
        </Button>
        <Button colorScheme="blue"onClick={()=>{CreateStudent(applicant,isAdmin)}}>Accept Application</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  </>
      )
  })}
  
  <Tfoot>
  </Tfoot>
</Table>
                
            </Flex>
        </Flex>
        </>
    )
}
