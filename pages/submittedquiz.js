import React from 'react';
import {Flex,
    Heading,
    RadioGroup,
    Stack,
    Button,
    Text,
    Badge

} from '@chakra-ui/react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import {quizQuestions, attemptedState} from '../Components/Students/stateUtil.js';
import {CheckIcon,SmallCloseIcon} from '@chakra-ui/icons'

export default function submittedquiz() {
    const attemptedQns = useRecoilValue(attemptedState);
    const allQuestions = useRecoilValue(quizQuestions);
    let correcOption='';
    return (
        <div>
            {allQuestions.map((question,key)=>{
                for(let qn of attemptedQns){
                    //if question is attempted
                    if(question.id===qn.questionId){
                        //if answer is correct
                        if(question.answer === qn.choice){
                            return (
                                <Flex direction="column">
                                <Heading>{question.question}</Heading>
                                <CheckIcon /><Text>{qn.Value}</Text>
                                <Text>Points Earned are {question.weight}</Text>

                            </Flex>

                            )
                            
                        }else{
                            correcOption=question.answer;
                            return (
                                <Flex direction="column">
                                <Heading>{question.question}</Heading>
                                <SmallCloseIcon /><Text>{qn.Value}</Text>
                                <Text>Correct answer is <Badge ml="1" fontSize="0.8em" colorScheme="green">
                                {question.options[''+correcOption]}</Badge></Text>
                                <Text>No Points earned</Text>
                            </Flex>
                            )
                            
                        }

                    }
                }
            })}
            
            
        </div>
    )
}
