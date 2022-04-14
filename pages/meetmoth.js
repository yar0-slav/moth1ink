import Section from "../components/section";
import {Container, Heading, Flex, Image, Box, Link, Button} from '@chakra-ui/react';
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
                        Hello, wanderer!
                    </Heading>
                    <Box
                        p={{base: "20px", md: '25px'}}
                        borderRadius={{base: 'inital', md: '20px'}}
                        mb={5}
                    >
                        <Box pr={{base: "0", md: '25px'}} mb={{base: "1em", md: '0'}}>
                            <p pr={{base: "0", md: '25px'}} mb={{base: "1em", md: '0'}}>
                                Glad that you stumbled upon my portfolio site. Please, let me
                                introduce myself a bit more to you before we jump into a tattoo session.<br /><br />

                                I have been give the name Dominika, sadly not Moth. I quite enjoy wandering around in
                                nature, letting my imagination go on a journey on its own, while observing the world
                                around me. Animals are love, animals are life – except fish, I don’t like them since
                                they are unpredictable. (They possibly don’t like me either).<br /><br />

                                This all started because of my love for drawing and painting. Long before I touched a
                                tattoo gun, I had practised and studied art. In the last two years I started also
                                experimenting and slowly transitioning to digital art as well. Well and from there, the
                                natural move for me was to get into tattooing, as it bring the whole artistic experience
                                to another level. And I am a tattoo geek myself!<br /><br />

                                The process of making a permanent mark to someone else’s skin, brings a whole lot of
                                different elements into the play. There is no CTRL+Z , no starting over, the trust and
                                the connection between the artists and the client has to be established and tested
                                during the process. The mixtures of pain, ink and blood while some of my favourite music
                                is playing in the background brings me into the ‘zone’. That is where I am 100% focused,
                                nothing else exists, nothing else matters at that time, just the tattoo I am creating on
                                your skin. And the ultimate, unreal feeling, of then realizing that you will proudly
                                wear the work I have done on your skin until the rest of your days, gives me the
                                greatest satisfaction mixed with the unreal feelings that you have given me the trust.<br />

                                One thing which I realized is that I will most possibly never be satisfied with where I
                                am in my tattoo artist journey. Even though I started 7 years ago, in 2015, there is
                                always something to improve, something new to learn.<br /><br />

                                When it comes to the subject of tattoos, I will draw you your own custom design, suited
                                to your story. The more details you provide me with, the more accurate I will be able to
                                portray your next tattoo.<br />

                                My style and specialization is mainly focused around: black & grey, new school,
                                dot-work, geometric, surrealism, floral, line-work, trash, dark and black-work.<br /><br />

                                So what, ready or not? Let’s get weird and mix some black ink with blood. Hit me up via
                                email, Instagram DMs, fax or damn even send me a letter on a dragon.<br /><br />

                            </p>
                        </Box>
                        <Box>
                            <Box
                                borderColor="whiteAlpha.800"
                                w="10em"
                                h="15em"
                                display="inline-block"
                                overflow='hidden'
                            >
                                <Image display='inline-block' h='100%' w='100%' borderRadius='15px' src='/moth-ink.png'
                                       alt='Moth1nk Profile Picture' objectFit='cover' objectPosition='45% 1%'></Image>
                            </Box>
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