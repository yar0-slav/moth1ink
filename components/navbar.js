import NextLink from 'next/link'
import {
    Container,
    Box,
    Link,
    Stack,
    useColorModeValue
} from '@chakra-ui/react'



const LinkItem = ({ href, path, target, children, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
    return (
        <NextLink href={href} passHref scroll={false}>
            <Link
                p={2}
                bg={active ? 'grassTeal' : undefined}
                color={active ? '#202023' : inactiveColor}
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
            color={useColorModeValue('#fff', '#000')}
            zIndex={1}
            {...props}
        >
            <Container
                display="flex"
                p={2}
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
                    <LinkItem href="/meetmoth" path={path}>
                        Meet Moth
                    </LinkItem>

                </Stack>

            </Container>
        </Box>
    )
}

export default Navbar