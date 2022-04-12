import Section from "../components/section";
import {Container, Heading, Flex, Image, Box, Link, Button, Text} from '@chakra-ui/react';
import {ArrowBackIcon} from '@chakra-ui/icons'
import NextLink from 'next/link'

const Meetmoth = () => {
    return (
        <Container maxW="container.md" minH='calc(100vh - 56px - 2rem)' display={{base: 'initial', md: 'flex'}}
                   alignItems='center'>
            <Section>
                <Box px={{base: '0px', md: '10px'}} py={{base: '0px', md: '5px'}} display='flex' flexDirection='column'>
                    <Flex mb={5}>
                        <NextLink href='/'>
                            <Button leftIcon={<ArrowBackIcon/>} colorScheme='moth' variant='solid' size='md'>
                                <Link>
                                    Take me back
                                </Link>
                            </Button>
                        </NextLink>
                    </Flex>
                    <Heading as='h3' size='3xl' mb={5}>
                        Something something,
                    </Heading>
                    <Box
                        display={{base: 'inital', md: 'flex'}}
                        p={{base: "20px", md: '25px'}}
                        borderRadius={{base: 'inital', md: '20px'}}
                        mb={5}
                    >
                        <Text pr={{base: "0", md: '25px'}} mb={{base: "1em", md: '0'}}>
                            lorem ipsum dolor sit amet. consectetur adipiscing elit. Fusce et faucibus est. Pellentesque
                            bibendum lobortis neque, a dictum dui placerat in. Cras bibendum imperdiet lectus in
                            volutpat. Phasellus sed condimentum lectus. Vestibulum magna felis, euismod quis sem eu,1
                            ullamcorper accumsan sem. Maecenas eget laoreet quam, in tempus sapien. Nulla ac rhoncus
                            tortor. Mauris eleifend scelerisque dolor et porttitor. Curabitur a lectus lacus. Nam
                            facilisis ultrices viverra. Pellentesque quis felis sit amet magna pellentesque ullamcorper.
                            Vestibulum et fermentum neque.
                        </Text>
                        <Box>
                            <Image maxW={{base: "100%", md: '300px'}} display='inline-block' src='/moth-ink.png'
                                   alt='Moth1nk Profile Picture'></Image>
                        </Box>
                    </Box>
                </Box>
            </Section>
            <style global jsx>{`
              .background-color--change {
                background-color: black;
              }
            `}</style>
        </Container>
    )
}

export default Meetmoth