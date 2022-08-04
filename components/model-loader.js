import React, { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import Hint from './hint'

export const DogSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const DogContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    m="auto"
    className="object_three"
    w={[300, 480, 620]}
    h={[300, 480, 620]}
    position="relative"
    order={{ base: '1', md: 'initial' }}
  >
    {children}
    <Box pos="absolute" bottom="15px" left="15px">
      <Hint />
    </Box>
  </Box>
))

const Loader = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  )
}

export default Loader
