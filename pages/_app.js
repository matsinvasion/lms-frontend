import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import {AuthUserProvider} from '../context/AuthUserContext.js'
import {RecoilRoot} from 'recoil';
function MyApp({ Component, pageProps }) {
  
    return (
      <AuthUserProvider>
        <ChakraProvider>
        <RecoilRoot>
         <Component {...pageProps} />
         </RecoilRoot>
      </ChakraProvider>
     
      </AuthUserProvider>
      
    )
  
  
}

export default MyApp
