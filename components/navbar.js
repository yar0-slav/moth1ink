import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'

import { gsap } from 'gsap/dist/gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import * as ga from '../lib/ga'

const LinkItem = ({ href, path, target, children, ...props }) => {
  gsap.registerPlugin(ScrollToPlugin)

  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#fff' : inactiveColor}
        boxShadow="none !important"
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

  const clickItem = data => {
    ga.event({
      action: 'click',
      params: {
        item: data
      }
    })
  }

  const scrollToEl = e => {
    const target = e.getAttribute('scrollto')
    gsap.to(window, { duration: 0.1, scrollTo: { y: target, offsetY: 50 } })
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      color="#fff"
      backgroundColor="rgba(0,0,0,0)"
      backdropFilter="blur(20px)"
      zIndex={1}
      {...props}
    >
      <Container display="flex" maxW="container.lg">
        <Stack
          direction="row"
          display="flex"
          width={{ base: 'full', md: 'auto' }}
          alignItems="right"
          justify="right"
          flexGrow={1}
          spacing="30px"
        >
          <LinkItem
            href="/meetmoth"
            path={path}
            px={0}
            data-ga="Meet Moth Page"
            onClick={e => clickItem(e.target.getAttribute('data-ga'))}
          >
            Meet Moth
          </LinkItem>
          <Box
            path={path}
            px={0}
            scrollto="#gallery"
            data-ga="Galery"
            onClick={e => {
              clickItem(e.target.getAttribute('data-ga'))
              scrollToEl(e.target)
            }}
            cursor="pointer"
            alignSelf={'center'}
            _hover={{
              textDecor: 'underline'
            }}
          >
            Gallery
          </Box>
          <Box
            path={path}
            px={0}
            scrollto="#reviews"
            data-ga="Reviews"
            onClick={e => {
              clickItem(e.target.getAttribute('data-ga'))
              scrollToEl(e.target)
            }}
            cursor="pointer"
            alignSelf={'center'}
            _hover={{
              textDecor: 'underline'
            }}
          >
            Reviews
          </Box>
          <Box
            path={path}
            px={0}
            scrollto="#contact"
            data-ga="Contact"
            onClick={e => {
              clickItem(e.target.getAttribute('data-ga'))
              scrollToEl(e.target)
            }}
            cursor="pointer"
            alignSelf={'center'}
            _hover={{
              textDecor: 'underline'
            }}
          >
            Contact
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar
