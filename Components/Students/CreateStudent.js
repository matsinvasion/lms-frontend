import React from 'react';
import {db} from '../../firebase/clientApp.js'
import { doc, setDoc } from "firebase/firestore"; 

const url='http://localhost:3000/sendmail'
const generatePassword = ()=>{
    let password = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++){
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
   

    return password;
}

export default function CreateStudent(applicantObject,isAdmin) {
    
    console.log(isAdmin)
    let studentEmail = applicantObject.emailAddress;
    let password = generatePassword();

    //decode token
    if(isAdmin){
    //emaill signup link for admitted applicants
    try{
        fetch(url,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({email:studentEmail})
        }).then((res)=>{
            return res.json()
        }).then(result =>{
            console.log('student notified via email')
        }).catch(err =>{console.log(err.message)})

    }catch(err){
        console.log(err.message)
    }
        console.log('add to student collection')
    //so how do we much up user created and student collection?
    }else{
        console.log('not admin')
    }

    return (
        <div>
            {/** return a toast whether successful or not */}
        </div>
    )
}
