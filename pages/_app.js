import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import { Toaster } from 'react-hot-toast'

import '../styles/main.css'

import { useEffect } from 'react'

import * as ga from '../lib/ga'

const Website = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
      <Chakra cookies={pageProps.cookies}>
        <Fonts />
        <Layout router={router}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component {...pageProps} key={router.route} />
            <Toaster />
          </AnimatePresence>
        </Layout>
      </Chakra>
  )
}

export default Website
