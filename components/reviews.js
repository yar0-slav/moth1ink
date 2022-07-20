import { Container, Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import StarsRating from 'react-star-rate';
import { Icon } from '@chakra-ui/react'
import { IoRemoveCircleSharp, IoAddCircleSharp, IoStarOutline, IoStar } from 'react-icons/io5'


export default function Reviews({ comments, totalComments }) {
    return (
        <Container maxW={"container.lg"} p={0} >
            <Flex
                justifyContent='space-evenly'
                alignItems='left'
                flexDirection='column'
            >
                {
                    comments && comments.length > 0 ?
                        comments.map((comment, i) => {
                            const { pros } = comment
                            const filtered = pros.reduce((result, { value, executed }) => executed ? result.push(value) && result : result, []);

                            return (
                                <Container commentid={comment.id} maxW={"container.md"} background="#252525" p={5} rounded="base" my="10px">
                                    {
                                        totalComments >= 50 ? i + 1 : ""
                                    }
                                    <Box display={'flex'} justifyContent={'space-between'}>
                                        <Box>
                                            <Text textTransform='capitalize' mr='10px'>
                                                {comment.username}
                                            </Text>
                                            <StarsRating
                                                defaultValue={comment.starRating}
                                                disabled
                                                symbol={<Icon as={IoStar} />}
                                            />
                                        </Box>
                                        <Text fontSize={13}>
                                            {(moment(comment.time).locale('sk-SK').calendar())}
                                        </Text>
                                    </Box>
                                    <Box my="20px">
                                        <Text>
                                            {comment.content}
                                        </Text>
                                        <Flex mt={filtered && filtered.length > 1 ? '2rem' : ''}>
                                            <Box flexBasis={'49%'}>
                                                {
                                                    pros && pros.length > 1 ?
                                                    filtered.map((x) => {

                                                        return (
                                                            <Flex mb={'.5rem'}>
                                                                <Icon as={IoAddCircleSharp} color='green' fontSize={'28px'} />
                                                                <Text ml='1rem'>{x}</Text>
                                                            </Flex>
                                                        )
                                                    })



                                                    :
                                                    ""
                                                }

                                            </Box>
                                            <Box flexBasis={'49%'}>
                                                {
                                                    comment.cons && comment.cons.length > 0 ?
                                                        comment.cons.map(x => {
                                                            return (
                                                                <Flex mb={'.5rem'}>
                                                                    <Icon as={IoRemoveCircleSharp} color='red' fontSize={'28px'} />
                                                                    <Text ml='1rem'>{x.value}</Text>
                                                                </Flex>
                                                            )
                                                        })
                                                        :
                                                        ""
                                                }
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Container>
                            )
                        })
                        :
                        ""
                }

            </Flex>

        </Container>
    )
}


