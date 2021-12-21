import React from 'react';
import {app as Auth} from "../firebase/clientApp.js"
import ReactDOM from 'react-dom';
import { Formik, Form, useField,Field,FieldArray } from 'formik';
import {Timestamp,addDoc, doc, setDoc,updateDoc, increment,collection, query, where, getDocs } from "firebase/firestore"; 
import {db} from '../firebase/clientApp.js';
import { getAuth, signOut,createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {createdQuiz} from '../Components/Students/stateUtil.js'

import * as Yup from 'yup';
import {Flex,
    Box,
    Heading,
    Text,
    Input,
    Button,
    Link,
    Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Radio,
  RadioGroup,
  Stack,
  Select} from '@chakra-ui/react'

  import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  

/**Re-usable form components */
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label  htmlFor={props.id || props.name}>{label}</label>
        <Input mb={4} className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div mt={-2}className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Select  mb={4} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  /* signup form */
  export const SignUp =()=>{
    const router = useRouter();
    const url = 'http://localhost:3000/setclaims'
    
      return(
         <Flex direction="column" height="100vh" alignItems="center" justifyContent="center">
             <Heading fontSize="xl" mb={6}>Conguratulations on your addmission.  Please SignUp</Heading>
             <Formik
             initialValues={{
                 email:'',
                 password:'',
             }}
             validationSchema={
                 Yup.object({
                    email:Yup.string()
                    .email('Invalid Email address')
                    .required('Required'),

                    password:Yup.string()
                    .required('PassWord is required')
                    .min(8, 'Password should be 8 characters')
                 })  
             }

             onSubmit={ (values,{ setSubmitting })=>{
                 //create user user, js client sdk
                 const Auth = getAuth();
                
                try{
                        const studentRef = doc(db,'students', values.email)
                        createUserWithEmailAndPassword(Auth,values.email,values.password)
                        .then((userCredential)=>{
                            const user = userCredential.user;
                            //setCustomClaims via admin sdk
                            fetch(url,{
                                method:'POST',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify({uid:user.uid,role:'student'})
                            }).then((res)=>{res.json()})
                            .then((result)=>{
                                console.log('student role is set')
                                //update student collection
                            })
                            //Add userid field to student document
                              updateDoc(studentRef,{
                                userid:user.uid
                            }).then(()=>{
                                
                            //redirect to signin page
                            router.push('/auth')
                            }).catch((err)=>{err.message})
                            
                            
                            
                        })
                        .catch((err)=>{
                            console.log(err.message)
                        })
                }catch(err){                  
                    console.log(error)
                }
            }

            }
             >
                 <Form>
                     <Flex direction="column" background="gray.100" p={12} rounded={6}>
                     <MyTextInput
                    w='100%'
                    variant="outline" 
                   
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="e.g Janenyambi@abc.com"
                />
                <MyTextInput
                    w='100%'
                    variant="outline" 
                   
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="password in 8 characters"
                />
                 <Button w='40%' type="submit" colorScheme="teal">Sign Up</Button>
                     </Flex>
                 </Form>

             </Formik>
         </Flex>
      )
  }

  /** signOut button */
  export const SignOut =()=>{
    const auth = getAuth();
    const router = useRouter();
    

      return (
        <Button onClick={()=>{
            signOut(auth).then(() => {
            router.push('/')
          }).catch((error) => {
            // An error happened.
            console.log(error.message)
          });}}>SignOut</Button>
      )

  }
   
  /** Application form */

  export const Apply = ()=>{
      /** regex for phone number validation */
      const regex = /^\+(?:[0-9]●?){6,14}[0-9]$/;
      const router = useRouter()
      return (
          <>
        <Flex direction="column" pl={6} mt={6} rounded={6}>
            <Heading fontSize="xl" mb={6}>Apply Here</Heading>
            <Formik
            initialValues={{
                fullName:'',
                emailAddress:'',
                phoneNumber:'',
                countryOfResidence:'',
                languagesOrSkillToLearn:'',
                educationLevel:'',
                applied_at:Timestamp.now()
            }}
            validationSchema={
                Yup.object({
                    fullName:Yup.string()
                    .required('Required'),
                    emailAddress:Yup.string()
                    .email('Invalid Email address')
                    .required('Required'),
                    phoneNumber:Yup.string().matches(regex,'Phone number is not valid')
                    .required('Required'),
                    countryOfResidence:Yup.string()
                    .oneOf(
                        ['South Sudan','Uganda','Somalia']
                    )
                    .required('Required'),
                    languagesOrSkillToLearn:Yup.string()
                    .oneOf(
                        ['Swahili','English','French','Arabic','Computer skills']
                    )
                    .required('Required'),
                    educationLevel:Yup.string()
                    .oneOf(
                        ['Primary School','High School','Bachelors Degree','Post Graduate','None']
                    )
                    .required('Required')

                })
            }
            onSubmit={async (values, { setSubmitting }) => {
                try{
                    const ApplicantRef = await addDoc(collection(db,'applicants'),
                values
                )
                if(ApplicantRef.id){
                    //update counters/applicants/count
                    //use transactions
                    const ApplicantCountRef = doc(db,'counters','applicants');
                    await updateDoc(ApplicantCountRef,{
                        count:increment(1)
                    })
                    return (
                        router.push(`/application/successful/${ApplicantRef.id}`)
                    )
                    
                }
                }catch(err){
                    console.log(error)
                }
                
              }}
            >
        <Form>
                <MyTextInput
                    w='100%'
                    variant="outline" 
                   
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="e.g Jane nyambi"
                />
                <MyTextInput
                    w='100%'
                    variant="outline" 
                   
                    label="Email Address"
                    name="emailAddress"
                    type="text"
                    placeholder="e.g Janenyambi@xyz.com"
                />
                <MyTextInput
                    w='100%'
                    variant="outline" 
                   
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    placeholder="e.g +256 123 456 789"
                />
                <MySelect w='100%' label="Select a Country"variant="outline" type label="Country Of Residence" name="countryOfResidence">
                    <option value=""></option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Somalia">Somalia</option>
                </MySelect>
                <MySelect  w='100%' label="Choose Language or skill to learn" name="languagesOrSkillToLearn"variant="outline" >
                <option value=""></option>
                    <option value="Swahili">Swahili</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                    <option value="computer skills">computer Skills</option>
                </MySelect>
                <MySelect  w='100%' label="Education Level" placeholder="choose education level" name="educationLevel" variant="outline"  >
                    <option value=""></option>
                    <option value="Primary School">Primary School</option>
                    <option value="High School">High School</option>
                    <option value="Bachelors Degree">Bachelor Degree</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="None">None</option>
                </MySelect>
                <Button w='40%' type="submit" colorScheme="teal">Apply</Button>

        </Form>

            </Formik>
            
        </Flex>
        </>
      );
  };

  
  export const CreateQuiz=()=>{
      let option = 1;
      const [assignments, setAssignments] = useRecoilState(createdQuiz)
      const router = useRouter();
      return (
          <>
          <Formik
          initialValues={{
              tag:'',
              numberofquestions:0,
              grade:0,
              questions:[{
                question:'',
                weight:'',
                answer:'',
                options:[''],
                active:''
        }]
          }}
          onSubmit={async ({tag,numberofquestions,grade,questions,active}) =>{
            
            try{
              const createquiz= await addDoc(collection(db, "quizes"),{
                Tag:tag,
                Numberofquestions:numberofquestions,
                Grade:grade,
                Questions:questions,
                active:false
              })
              
              if(createquiz.id){
                setAssignments(assignments=>[...assignments,tag])
                router.reload(window.location.pathname);
              }

            }catch(err){
              console.log(err)
            }
              
              
            
          }}
          >
              {({values})=>(
                  <Form>
                  <MyTextInput variant="outline" label="Tag" name="tag"/>
                  <MyTextInput variant="outline" label ="Number of Questions" name="numberofquestions"/>
                  <MyTextInput variant="outline" label="Quiz Grade" name="grade" />
                  <FieldArray
                  name="questions"
                  render={arrayHelpers=>(
                    <Flex direction="column">
                        {values.questions && values.questions.length > 0 ? (
                            
                            values.questions.map((question,index)=>(
                                
                                <Flex direction="column" key={index}>
                                    
                                    <label> question
                                    <MyTextInput variant="outline" label="Question" name={`questions.${index}.question`}/>
                                    </label>
                                    <label>grade
                                    <MyTextInput variant="outline"name={`questions.${index}.weight`} label="Marks"/>
                                    </label>
                                    <label>answer
                                    <MyTextInput variant="outline" label="answer" name={`questions.${index}.answer`}/>
                                    </label>
                                    <FieldArray
                                    name={`questions.${index}.options`}
                                    render={innerArrayHelpers=>(
                                        <>
                                        {question.options && question.options.length >0 ?(
                                            question.options.map((option,OpIndex)=>(
                                                <div key={OpIndex}>
                                                <MyTextInput variant="outline" label="Option" name={`questions.${index}.options.${OpIndex}`}/>
                                                <Button type="button" onClick={()=>innerArrayHelpers.push('')}> Add</Button>
                                                <Button type="button"onClick={() => innerArrayHelpers.remove(OpIndex)}>
                                                    -
                                                </Button>
                                                </div>
                                            ))
                                        ):(
                                            <div>
                                               <Button type="button" onClick={()=>innerArrayHelpers.push('')}> Add</Button>
                                               
                                            </div>
                                            
                                        )}
                                        
                                        
                                        </>
                                    )}
                                    />
                                    <MySelect label="Active" name="active" variant="outline" >
                                    <option value=""></option>
                                    <option value="Primary School">True</option>
                                    <option value="High School">False</option>

                                    </MySelect>
                                    
                    
                
                                    
                                   
                                    
                                    
                                    <Button type="submit"  size="sm">
                                    submit
                                    </Button>

                                </Flex>
                        ))
                        ):(
                            <Button size="md" type="button" onClick={() => arrayHelpers.push('')}>
                              {/*  */}
                              Add a question
                            </Button>
                          )}

                    </Flex>
                  )} />
              </Form>

              )}
              
          </Formik>
          </>
      )
      
  }

 