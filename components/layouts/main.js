import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import { useEffect } from 'react'

import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'

const Main = ({ children, router }) => {
  const handleAcceptCookie = () => {
    window.gtag('consent', 'update', {
      ad_storage: 'granted'
    })
  }

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    document.cookie = '_ga=;expires=' + new Date(0).toUTCString()
    document.cookie = `_ga_T0F84YE6S6=.G=;expires=` + new Date(0).toUTCString()
    document.cookie = '_gat=;expires=' + new Date(0).toUTCString()
    document.cookie = '_gid=;expires=' + new Date(0).toUTCString()
  }

  useEffect(() => {
    const isConsent = getCookieConsentValue()
    console.log(isConsent)
    if (isConsent === 'true') {
      handleAcceptCookie()
    }
  }, [])

  return (
    <Box
      as="main"
      className="background-color--change"
      data-page={router.asPath == '/' ? 'homepage' : router.asPath.slice(1)}
      pb={8}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Moth1nk Tattoo" />
        <meta name="author" content="yaro" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Moth1nk Tattoo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
        <title>Moth1nk | Tattoo Artist</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.lg" pt={14}>
        <CookieConsent
          containerClasses="cookieConsentBar"
          enableDeclineButton
          overlay
          overlayClasses="cookieConsent-overlay"
          overlayStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
          buttonStyle={{
            background: '#1a73e8',
            color: 'white',
            padding: '15px 35px',
            borderRadius: '30px'
          }}
          cookieName="Analytics"
          ariaAcceptLabel="Accept"
          ariaDeclineLabel="Decline"
          buttonText="Accept"
          disableStyles={true}
          declineButtonText="Decline"
          declineButtonStyle={{
            background: 'rgb(0 0 0 / 0%)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '30px'
          }}
          onDecline={handleDeclineCookie}
          onAccept={handleAcceptCookie}
        >
          This site uses analytical cookies for improving user experience.
          Analytical cookies are used for gathering information how the visitors
          interact with the site. They cannot be used to directly identify a
          user. By using our site you agree with using cookies.
        </CookieConsent>
        {children}
      </Container>
    </Box>
  )
}

export default Main
