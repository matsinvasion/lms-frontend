import React from 'react';
import {Flex,
    Heading,
    RadioGroup,
    Stack,
    Button,
    Text,
    FormControl

} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
import {attemptedState,quizQuestions} from '../Components/Students/stateUtil';
import {db} from '../firebase/clientApp.js';
import { collection, getDocs } from "firebase/firestore";
import { useAuthHook } from '../context/AuthUserContext.js';


  
export default function quiz({questions}) {

    const {user,loading}=useAuthHook();
    const [quiz,setQuiz]=useRecoilState(quizQuestions);
    const [checked,isChecked]=React.useState()
    const [attemptedQn,setAttemptedQuestion] = React.useState('')
    const [answers,setAnswers]=React.useState([])
    const [qnAns, setqnAns] = useRecoilState(attemptedState);
   

    const router =useRouter();

    
   const getOptionsAndAnswer = ({id,options}) =>{

        
        let content =[];
        
        for (const [key, value] of Object.entries(options)) {
            content.push(
            <FormControl as="fieldset">
            
            <Stack direction="column">
            <label>
                
                <input checked={checked} onChange={()=>{
                    
                   setqnAns(qnAns => [...qnAns,{questionId:id,choice:key,Value:value}])
                }} type="radio" name="choice" value={`${value}`} />   {value}
            </label>
            </Stack>
            
            </FormControl>)
          }
          return content
    }

    React.useEffect(async()=>{
        if(user){
            console.log('here')
            try{
                const snapShot = await getDocs(collection(db, "questions"));
                const questions = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setQuiz(questions)
                setAnswers(...answers,questions.map((question)=>{return question.answer }))
            }catch(err){
                console.log(err)
            }
        }else{
            console.log('loading')
        }
    },[user])
    return (
        <>
        <Text>Chiken</Text>
        {console.log(quiz)}
        {quiz.length>0 ? quiz.map((question,key)=>{  
                return(
                    <Flex flexDir="column">
                    <Heading>
                        {question.question}
                    </Heading>
                    <form>
                        
                    {getOptionsAndAnswer(question)}
                    </form>
                    
                    </Flex>

                
            )}):'loading'}
            <Button onClick={()=>{

                router.push('/submittedquiz')
            }}type="submit">Submit</Button>
        </>
    )
}
