import { Container, Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import StarsRating from 'react-star-rate'
import { Icon } from '@chakra-ui/react'
import { IoRemoveCircleSharp, IoAddCircleSharp, IoStar } from 'react-icons/io5'

export default function Reviews({ comments, totalComments }) {
  return (
    <Container maxW={'container.lg'} p={0}>
      <Flex
        justifyContent="space-evenly"
        alignItems="left"
        flexDirection="column"
      >
        {comments && comments.length > 0
          ? comments.map((comment, i) => {
              const { filteredValues, time } = comment
              // const filtered = pros.reduce((result, { value, executed }) => executed ? result.push(value) && result : result, []);

              return (
                <Container
                  commentid={comment.id}
                  key={comment.id}
                  maxW={'container.md'}
                  background="#252525"
                  p={5}
                  rounded="base"
                  my="10px"
                >
                  {totalComments >= 50 ? i + 1 : ''}
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Box>
                      <Text textTransform="capitalize" mb="5px">
                        {comment.username}
                      </Text>
                      <StarsRating
                        defaultValue={comment.starRating}
                        disabled
                        symbol={
                          <Icon
                            as={IoStar}
                            fontSize={{ base: '30px', md: '40px' }}
                          />
                        }
                      />
                    </Box>
                    <Text fontSize={13}>
                      {moment(time).locale('sk-SK').calendar(null, {
                        lastDay: '[Yesterday at] HH:mm',
                        sameDay: '[Today at] HH:mm',
                        nextDay: '[Tomorrow at] HH:mm',
                        lastWeek: '[last] dddd [at] HH:mm',
                        nextWeek: 'dddd [at] HH:mm',
                        sameElse: 'L'
                      })}
                    </Text>
                  </Box>
                  <Box>
                    {comment.content.length > 0 ? (
                      <Text my="25px">{comment.content}</Text>
                    ) : (
                      ''
                    )}
                    <Flex my="10px">
                      {filteredValues.map(inner => {
                        var innerIndex = inner.column === 'pros' ? 0 : 1
                        return (
                          <Box flexBasis={'49%'} key={inner.column}>
                            {inner.inputValues.map((values, index) => {
                              return (
                                <Flex mb={'.5rem'} key={values.value + index}>
                                  {innerIndex === 0 ? (
                                    <Icon
                                      as={IoAddCircleSharp}
                                      color="green"
                                      fontSize={'28px'}
                                    />
                                  ) : (
                                    <Icon
                                      as={IoRemoveCircleSharp}
                                      color="red"
                                      fontSize={'28px'}
                                    />
                                  )}
                                  <Text ml="1rem">{values.value}</Text>
                                </Flex>
                              )
                            })}
                          </Box>
                        )
                      })}
                    </Flex>
                  </Box>
                </Container>
              )
            })
          : ''}
      </Flex>
    </Container>
  )
}
