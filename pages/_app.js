import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Layout from '../components/layouts/main'
import Fonts from "../components/fonts";
import {AnimatePresence} from "framer-motion";

import '../styles/main.css'

const theme = extendTheme({
    fonts: {
        heading: "Playfair Display",
        body: "playfair-display",
    },
    colors: {
        moth:
            {
                50: '#ffe1f1',
                100: '#ffb1cf',
                200: '#ff7ead',
                300: '#ff4c8d',
                400: '#ff1a6c',
                500: '#e60053',
                600: '#b40040',
                700: '#82002e',
                800: '#50001c',
                900: '#21000a',
            }
    }
})

const Website = ({ Component, pageProps, router }) => {
  return (
      <ChakraProvider theme={theme}>
        <Fonts />
        <Layout router={router}>
            <AnimatePresence exitBeforeEnter initial={true}>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </Layout>
      </ChakraProvider>
  )
}

export default Website
