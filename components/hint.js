import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Box
} from '@chakra-ui/react'

import React from 'react'
import { QuestionIcon, QuestionOutlineIcon } from '@chakra-ui/icons'

const Hint = () => {
  const initRef = React.useRef()
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return (
    <Popover
      closeOnBlur={false}
      placement="top-start"
      initialFocusRef={initRef}
      onClose={close}
      isOpen={isOpen}
    >
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              onClick={open}
              colorScheme="moth"
              boxShadow="none !important"
            >
              {isOpen ? <QuestionIcon /> : <QuestionOutlineIcon />}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            border={'none'}
            borderRadius="20px"
            p={4}
            color="white"
            bg="whiteAlpha.300"
            backdropFilter="blur(20px)"
            boxShadow="none !important"
          >
            <PopoverHeader>Controls</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                In the highlighted are use your mouse and mouse wheel to
                rotate/zoom. Hold CTRL + Left Mouse Button to move. On mobile,
                tap and hold with one finger to rotate, use two to zoom/move.
              </Box>
            </PopoverBody>
          </PopoverContent>
          {isOpen ? (
            <style global jsx>{`
              .object_three > canvas {
                box-shadow: 0 0 13px 2px #ff73a5;
                transition: box-shadow ease-in-out 0.33s;
              }
            `}</style>
          ) : (
            ''
          )}
        </>
      )}
    </Popover>
  )
}

export default Hint
