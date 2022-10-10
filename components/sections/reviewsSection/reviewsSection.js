import React, { useState, useEffect } from 'react'
import { firestore, fromMillis, postToJSON } from '../../../lib/firebase'

import { Container, Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
import moment from 'moment'
import StarsRating from 'react-star-rate'
import { Icon } from '@chakra-ui/react'
import { IoRemoveCircleSharp, IoAddCircleSharp, IoStar } from 'react-icons/io5'

import AddNewReview from './newReview'

export default function Reviews({
  reviews: defaultReviews,
  reviewsTotal: totalReviews,
  loaderActive,
  reviewsLimit
}) {
  const [hydrated, setHydrated] = useState(false)

  const [reviews, setReviews] = useState(defaultReviews)
  const [reviewsTotal, setReviewsTotal] = useState(totalReviews)
  const [reviewsEnd, setReviewsEnd] = useState(false)

  useEffect(() => {
    setHydrated(true);
    (async () => {
      const postsQuery = firestore
        .collection('comments')
        .orderBy('time', 'desc')
        .limit(reviewsLimit)
      const postsTotal = firestore.collection('reviews').orderBy('time', 'desc')

      const reviews = (await postsQuery.get()).docs.map(postToJSON)
      const reviewsTotal = (await postsTotal.get()).docs.map(postToJSON)

      setReviews(reviews)
      setReviewsTotal(reviewsTotal)

    })()
  }, [])

  if (!hydrated) {
    return null
  }

  const getMoreReviews = async () => {
    const last = reviews[reviews.length - 1]
    const cursor =
      typeof last.time === 'number' ? fromMillis(last.time) : last.time

    const query = firestore
      .collection('comments')
      .orderBy('time', 'desc')
      .startAfter(cursor)
      .limit(reviewsLimit)

    const newReviews = (await query.get()).docs.map(postToJSON)

    setReviews(reviews.concat(newReviews))

    if (newReviews.length < reviewsLimit) {
      setReviewsEnd(true)
    }
  }

  return (
    <Box id="reviews">
      <Heading my="5vh">
        Reviews {reviewsTotal.length >= 50 ? `(${reviewsTotal.length})` : ''}
      </Heading>

      <Container maxW={'container.lg'} p={0}>
        <Flex
          justifyContent="space-evenly"
          alignItems="left"
          flexDirection="column"
        >
          {reviews && reviews.length > 0
            ? reviews.map((comment, i) => {
                const { filteredValues, time } = comment
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
                    {reviewsTotal >= 50 ? i + 1 : ''}
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
      {!loaderActive && !reviewsEnd && reviewsLimit < reviewsTotal.length && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            onClick={getMoreReviews}
            colorScheme="moth"
            display={loaderActive ? 'none' : 'block'}
            mt="5vh"
            mb="10vh"
            w="sm"
          >
            Load more
          </Button>
        </Box>
      )}

      {reviewsEnd && (
        <Text textAlign="center" mt="2rem">
          No more reviews to load.
        </Text>
      )}
      <AddNewReview />
    </Box>
  )
}
