import Head from 'next/head'
import Navbar from "../navbar";
import {Box, Center, Container, Flex, Spacer, Image, useColorModeValue, Heading} from '@chakra-ui/react'

const Main = ({ children, router }) => {

        return (
        <Box as="main" className="background-color--change" bg={useColorModeValue("#FF005C","#000" )} pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Moth1nk Tattoo" />
                <meta name="author" content="Moth1nk" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@craftzdog" />
                <meta name="twitter:creator" content="@craftzdog" />
                <meta name="twitter:image" content="/card.png" />
                <meta property="og:site_name" content="Takuya Matsuyama's Homepage" />
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