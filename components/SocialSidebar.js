import {
    Container,
    Box,
    Link,
} from '@chakra-ui/react'
import Image from 'next/image'



const SocialSidebar = () => {
    const insta = `/socials/instagram-white.png`
    const facebook = `/socials/facebook-white.png`
    const twitter = `/socials/twitter-white.png`

    return (

        <Box
            as='div'
            position='block'
            right={{base: undefined, md: '-20px'}}
            bottom='0'
            mb={5}
            order={{base: '4', md: 'initial'}}

        >
            <Container p={0} maxW='container.xl'>
                <Box
                    flexDirection='row'
                    display='flex'
                    alignItems='center'
                    justify='flex-start'
                >
                    <Box position='relative' w={{base: '30px', md: '18px'}} h={{base: '35px', md: '18px'}}>
                            <Link href='https://www.instagram.com/moth.1nk/' isExternal>
                                <Image
                                    alt='instagram'
                                    src={insta}
                                    width='100%'
                                    height='100%'
                                    layout='responsive'
                                    objectFit='contain'
                                />
                            </Link>
                    </Box>
                    <Box position='relative' w={{base: '30px', md: '18px'}} h={{base: '35px', md: '18px'}} mx={3} my={3}>
                        <Link href='https://www.facebook.com/TattooDominica/' isExternal>
                            <Image
                                alt='facebook'
                                src={facebook}
                                width='100%'
                                height='100%'
                                layout='responsive'
                                objectFit='contain'
                            />
                        </Link>
                    </Box>
                    <Box position='relative' w={{base: '30px', md: '18px'}} h={{base: '35px', md: '18px'}}>
                        <Link href='https://twitter.com/Moth1nk' isExternal>
                            <Image
                                alt='twitter'
                                src={twitter}
                                width='100%'
                                height='100%'
                                layout='responsive'
                                objectFit='contain'
                            />
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    )

}

export default SocialSidebar