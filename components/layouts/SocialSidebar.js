import {
    Container,
    Box,
    Link,
    Text,
} from '@chakra-ui/react'
import Image from 'next/image'



const SocialSidebar = () => {
    const insta = `/socials/instagram-white.png`
    const facebook = `/socials/facebook-white.png`
    const twitter = `/socials/twitter-white.png`

    return (

        <Box
            as='aside'
            position={{base: 'block', md: 'absolute'}}
            right={{base: undefined, md: '-20px'}}
            bottom='0'
            mb={5}

        >
            <Container p={0} maxW='container.xl'>
                <Box
                    flexDirection={{base: 'row', md: 'column'}}
                    display='flex'
                    alignItems='center'
                    justify='flex-start'
                    flexGrow={1}
                    spacing={{base: '25px', md: '15px'}}
                >
                    <Text className='socials_sidebar' display={{base: 'none', md:'block'}} mb={3}>
                        Socials
                    </Text>
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
                    <Box position='relative' w={{base: '30px', md: '18px'}} h={{base: '35px', md: '18px'}} mx={5} my={3}>
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