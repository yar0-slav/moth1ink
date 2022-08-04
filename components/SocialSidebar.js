import { Container, Box, Link } from '@chakra-ui/react'
import Image from 'next/image'

import * as ga from '../lib/ga'

const SocialSidebar = () => {
  const insta = `/socials/instagram-white.png`
  const facebook = `/socials/facebook-white.png`
  const twitter = `/socials/twitter-white.png`

  const clickItem = data => {
    ga.event({
      action: 'click',
      params: {
        item: data
      }
    })
  }

  return (
    <Box
      as="div"
      position="block"
      right={{ base: undefined, md: '-20px' }}
      bottom="0"
      mb={5}
      order={{ base: '4', md: 'initial' }}
    >
      <Container p={0} maxW="container.xl">
        <Box
          flexDirection="row"
          display="flex"
          alignItems="center"
          justify="flex-start"
        >
          <Box
            position="relative"
            w={{ base: '30px', md: '18px' }}
            h={{ base: '35px', md: '18px' }}
          >
            <Link
              href="https://www.instagram.com/moth.1nk/"
              onClick={e => clickItem(e.target.getAttribute('data-ga'))}
              isExternal
            >
              <Image
                alt="instagram"
                src={insta}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                data-ga="Header Instagram"
              />
            </Link>
          </Box>
          <Box
            position="relative"
            w={{ base: '30px', md: '18px' }}
            h={{ base: '35px', md: '18px' }}
            mx={3}
            my={3}
          >
            <Link
              href="https://www.facebook.com/TattooDominica/"
              isExternal
              onClick={e => clickItem(e.target.getAttribute('data-ga'))}
            >
              <Image
                alt="facebook"
                src={facebook}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                data-ga="Header Facebook"
              />
            </Link>
          </Box>
          <Box
            position="relative"
            w={{ base: '30px', md: '18px' }}
            h={{ base: '35px', md: '18px' }}
          >
            <Link
              href="https://twitter.com/Moth1nk"
              isExternal
              onClick={e => clickItem(e.target.getAttribute('data-ga'))}
            >
              <Image
                alt="twitter"
                src={twitter}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
                data-ga="Header Twitter"
              />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SocialSidebar
