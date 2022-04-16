import NextLink from 'next/link'
import {
    Container,
    Box,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react'

import {useRouter} from "next/router";
// import React, { useEffect,useState } from "react";



const LinkItem = ({ href, path, target, children, ...props }) => {
    const router = useRouter();
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')

    // const [state, setState] = useState('')
    //
    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         console.log(
    //             `App is changing to ${url}`
    //         )
    //         setState({ clicked: false, menuName: "Menu" })
    //     }
    //
    //     router.events.on('routeChangeStart', handleRouteChange)
    //
    //     // If the component is unmounted, unsubscribe
    //     // from the event with the `off` method:
    //     return () => {
    //         router.events.off('routeChangeStart', handleRouteChange)
    //     }
    // }, [])

    return (
        <NextLink href={href} passHref scroll={false}>
            <Link
                p={2}
                bg={active ? 'grassTeal' : undefined}
                color={active ? '#fff' : inactiveColor}
                boxShadow='none !important'
                textDecoration={active ? 'underline' : 'none'}
                target={target}
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    )
}

const Navbar = props => {
    const { path } = props

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            color='#fff'
            backgroundColor='rgba(0,0,0,0)'
            backdropFilter='blur(20px)'
            zIndex={1}
            {...props}
        >
            <Container
                display="flex"
                maxW="container.lg"
            >
                <Stack
                    direction='row'
                    display='flex'
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="right"
                    justify="right"
                    flexGrow={1}
                >
                    <LinkItem href="/meetmoth" path={path} px={0}>
                        Meet Moth
                    </LinkItem>

                </Stack>

            </Container>
        </Box>
    )
}

export default Navbar