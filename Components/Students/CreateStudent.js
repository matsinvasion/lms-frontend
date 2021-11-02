import React from 'react';
import {db} from '../../firebase/clientApp.js'
import { doc, setDoc } from "firebase/firestore"; 


const generatePassword = ()=>{
    let password = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++){
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
   

    return password;
}

export default function CreateStudent(applicantObject,isAdmin) {
    //make user. Admin can create user
    //make student
    //emaill with login credentials
    console.log(isAdmin)
    let studentEmail = applicantObject.emailAddress;
    let password = generatePassword();

    //decode token
    if(isAdmin){
        //create user
        console.log('creating user')
    }else{
        console.log('no user')
    }

    return (
        <div>
            {/** return a toast whether successful or not */}
        </div>
    )
}
