import NextLink from 'next/link'
import {
    Container,
    Box,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react'

import * as ga from "../lib/ga";

const LinkItem = ({ href, path, target, children, ...props }) => {

    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')

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

    const clickItem = (data) => {
        ga.event({
            action: "click",
            params : {
                item: data
            }
        })
    }

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
                    <LinkItem href="/meetmoth"
                              path={path}
                              px={0}
                              data-ga='Meet Moth Page'
                              onClick={(e) => clickItem(e.target.getAttribute('data-ga'))}

                    >
                        Meet Moth
                    </LinkItem>

                </Stack>

            </Container>
        </Box>
    )
}

export default Navbar