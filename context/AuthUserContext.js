import { createContext, useContext, Context } from 'react'
import {useAuth} from '../Components/authandAuthorization.js'

const authUserContext = createContext({
    user:null,
    loading:true

})
export function AuthUserProvider({ children }){
    const auth = useAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;

}

// custom hook to use the authUserContext and access authUser and loading
export const useAuthHook = () => useContext(authUserContext);