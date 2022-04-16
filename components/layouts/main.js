import Head from 'next/head'
import Navbar from "../navbar";
import {Box, Container } from '@chakra-ui/react'


const Main = ({ children, router }) => {


        return (
        <Box as="main" className="background-color--change" data-page={router.asPath == '/' ? 'homepage' : router.asPath.slice(1)} pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Moth1nk Tattoo" />
                <meta name="author" content="yaro" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <meta property="og:site_name" content="Moth1nk Tattoo" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/card.png" />
                <title>Moth1ink</title>
            </Head>

            <Navbar path={router.asPath} />

            <Container color='white' maxW="container.lg" pt={14}>
                {children}
            </Container>


        </Box>
    )
}

export default Main