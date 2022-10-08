import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  Image
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import Clipboard from '../clipboardCopy';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';

import * as ga from '../../lib/ga/index'


export default function Contact() {
    const textAreaRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState('')

    function copyToClipboard() {
        Clipboard(textAreaRef.current.innerHTML, setCopySuccess)
      }
      
  const clickItem = (data) => {
    ga.event({
      action: 'click',
      params: {
        item: data
      }
    })
  }
    
  return (
    <Container maxW="container.md" p={0} my="26vh" id="contact">
      <Box textAlign="center" mb={8 * 2}>
        <Heading as="h1" size="4xl">
          Contact
        </Heading>
      </Box>
      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
      >
        <Box>
          <Heading size="md" mb={5}>
            Hit me up and disappoint your mom.
          </Heading>
        </Box>
        <Box
          p={7}
          border={'solid'}
          display="flex"
          flexDirection="column"
          borderRadius="15px"
          borderColor={copySuccess ? '#22f640' : undefined}
        >
          <Text
            alignSelf="center"
            ref={textAreaRef}
            mb={2}
            color={copySuccess ? '#22f640' : undefined}
          >
            moth.1nk.666@gmail.com
          </Text>
          <Button
            onClick={e => {
              copyToClipboard()
              clickItem(e.target.getAttribute('data-ga'))
            }}
            leftIcon={copySuccess ? <CheckIcon /> : <CopyIcon />}
            colorScheme={copySuccess ? 'mothGreen' : 'moth'}
            data-ga="Email Copied"
            variant="solid"
          >
            {copySuccess ? 'Email Copied' : 'Copy email'}
          </Button>
        </Box>
        <Text my={5}>or DMs</Text>
        <Box position="relative" w="5em" h="5em">
          <Link
            href="https://www.instagram.com/moth.1nk/"
            isExternal
            onClick={e => clickItem(e.target.getAttribute('data-ga'))}
          >
            <Image
              alt="instagram"
              src="/socials/instagram-white.png"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              data-ga="Instagram Footer"
            />
          </Link>
        </Box>
      </Flex>
    </Container>
  )
}
