import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../theme.js'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider resetCSS={true} theme={customTheme}>
    <Component {...pageProps} />
  </ChakraProvider>)
}

export default MyApp
