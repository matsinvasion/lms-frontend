import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import {collection,addDoc, doc, setDoc } from "firebase/firestore"; 
import {db} from '../firebase/clientApp.js';
import {Timestamp} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  Select} from '@chakra-ui/react'
  

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
                    return (
                        router.push('/applicationSuccess')
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