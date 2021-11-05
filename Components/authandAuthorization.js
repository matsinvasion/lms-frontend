import React,{ useState, useEffect } from 'react'
import {app as Auth} from "../firebase/clientApp";
import { getAuth} from "firebase/auth";
import nookies from 'nookies';
export const auth = getAuth();


  //For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object.
  // To access user and loading variables throughout your app, you will be using the Context API.
 
  export function useAuth() {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      setLoading(true)
      auth.onAuthStateChanged(async function handleAuth(user) {
        if (user) {
            const token = await user.getIdToken();
          setUser(user);
          nookies.set(undefined, 'token', token, { path: '/' });
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false)
        }
      });
    }, [user]);
  
    return {user, loading};
  }