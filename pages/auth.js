import React,{useState} from 'react'
import {app as Auth} from "../firebase/clientApp";
import {Flex,Heading,Input,Button} from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from "@chakra-ui/react"

  const url='http://localhost:3000/decodetoken'
export default function auth() {
    const Auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    
    const onSubmit =  event => {
        event.preventDefault()
       //dont use async/await, it fails 
        setError(null)
         signInWithEmailAndPassword(Auth,email,password)
        .then((authUser) => {
            authUser.user.getIdToken().then((idToken)=>{
                //make get request , set headers
                //verify token
                //4
                try{
                    const isAdmin = fetch(url,{
                        method:'GET',
                        headers:{
                        'Content-Type': 'application/json',
                         Authorization: `Bearer ${idToken}`,
                        }
    
                    }).then((res)=>{
                        return res.json()
                    }).
                    then(result => {
                        if(result.admin){
                            router.push(`/dashboard/admin/${result.uid}`);
                        }else if(result.teacher){
                            router.push(`/dashboard/teacher/${result.uid}`)
                        }else if(result.student){
                            router.push(`/dashboard/student/${result.uid}`)
                        }
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
          
        })
        .catch(error => {
            console.log(error.message)
          setError(error.message)
        });
        event.preventDefault();
      };

    return (
       
        <Flex height="100vh" alignItems="center" justifyContent="center">
             <form onSubmit ={onSubmit}>
             { error && <Alert status="error">
  <AlertIcon />
  
  <AlertDescription>{error}</AlertDescription>
  
</Alert>}
             <Flex direction="column" background="gray.100" p={12} rounded={6}>
                <Heading mb={6}>Log in please</Heading>
                <Input placeholder="Email Address" onChange={(event) => setEmail(event.target.value)} variant="filled" mb={9} type="email"/>
                <Input placeholder="Password" onChange={(event) => setPassword(event.target.value)} variant="filled" mb={6} type="password"/>
                <Button type="submit" colorScheme="teal">Log in</Button>
            </Flex>
            </form>
            
        </Flex>
    )
}
