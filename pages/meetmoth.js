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
                    <Heading as='h3' size='3xl' mb={5}>
                        Hey, I am Dominika!
                    </Heading>
                    <Box
                        display={{base: 'inital', md: 'flex'}}
                        p={{base: "20px", md: '25px'}}
                        borderRadius={{base: 'inital', md: '20px'}}
                        mb={5}
                    >
                        <Text pr={{base: "0", md: '25px'}} mb={{base: "1em", md: '0'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et faucibus est. Pellentesque
                            bibendum lobortis neque, a dictum dui placerat in. Cras bibendum imperdiet lectus in
                            volutpat. Phasellus sed condimentum lectus. Vestibulum magna felis, euismod quis sem eu,
                            ullamcorper accumsan sem. Maecenas eget laoreet quam, in tempus sapien. Nulla ac rhoncus
                            tortor. Mauris eleifend scelerisque dolor et porttitor. Curabitur a lectus lacus. Nam
                            facilisis ultrices viverra. Pellentesque quis felis sit amet magna pellentesque ullamcorper.
                            Vestibulum et fermentum neque.
                        </Text>
                        <Box>
                            <Image maxW={{base: "100%", md: '300px'}}display='inline-block' src='/moth-ink.png'></Image>
                        </Box>
                    </Box>
                    <Flex>
                        <Button leftIcon={<ArrowBackIcon/>} colorScheme='moth' variant='solid' size='md'>
                            <NextLink href='/'>
                                <Link>
                                    Take me back</Link>
                            </NextLink>
                        </Button>
                    </Flex>
                </Box>
            </Section>
            <style global jsx>{`
              .background-color--change {
                background: black;
              }
            `}</style>
        </Container>
    )
}

export default Meetmoth