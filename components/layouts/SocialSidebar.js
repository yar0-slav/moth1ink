import {
    Container,
    Box,
    Link,
    VStack,
    Text,
} from '@chakra-ui/react'
import Image from 'next/image'



const SocialSidebar = () => {
    const insta = `/socials/instagram-white.png`
    const facebook = `/socials/facebook-white.png`
    const twitter = `/socials/twitter-white.png`

    return (
        <Box
            as="aside"
            position="absolute"
            right="-35px"
            bottom="0"


        >
            <Container maxW='container.xl'>
                <VStack
                    direction= 'column'
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="center"
                    justify="right"
                    flexGrow={1}
                    spacing='15px'
                >
                    <Text className="socials_sidebar" >
                        Socials
                    </Text>
                    <Box position="relative" w="18px" h='18px'>
                            <Link href='https://www.instagram.com/moth.1nk/' isExternal>
                                <Image
                                    alt='instagram'
                                    src={insta}
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                />
                            </Link>
                    </Box>
                    <Box position="relative" w="18px" h='18px'>
                        <Link href='https://www.facebook.com/TattooDominica/' isExternal>
                            <Image
                                alt='facebook'
                                src={facebook}
                                width="100%"
                                height="100%"
                                layout="responsive"
                                objectFit="contain"
                            />
                        </Link>
                    </Box>
                    <Box position="relative" w="18px" h='18px'>
                        <Link href='https://twitter.com/Moth1nk' isExternal>
                            <Image
                                alt='twitter'
                                src={twitter}
                                width="100%"
                                height="100%"
                                layout="responsive"
                                objectFit="contain"
                            />
                        </Link>
                    </Box>
                </VStack>
            </Container>
        </Box>
    )

}

export default SocialSidebar