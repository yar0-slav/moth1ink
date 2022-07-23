import React, { useEffect, useRef, useState } from 'react'
import { Container, Box, Heading, Flex, Text, Button, Link, Spinner, Input, InputGroup, InputLeftElement, Textarea, FormLabel } from '@chakra-ui/react';
import Masonry from 'react-masonry-css'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'
import Reviews from '../components/reviews';


import { firestore, fromMillis, postToJSON, serverTimestamp } from '../lib/firebase';

import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import IndexContent from "../components/indexContent";

import { search, mapImageResources, getFolders } from "../lib/cloudinary";

import { convertImage, toBase64 } from "../components/imagePreloader";

import toast from 'react-hot-toast';

import StarsRating from 'react-star-rate';

import { Icon } from '@chakra-ui/react'
import { IoRemoveCircleSharp, IoAddCircleSharp, IoStar } from 'react-icons/io5'


import * as ga from '../lib/ga'


// Max comments to query
const LIMIT = 5;



export default function Page({ images: defaultImages, nextCursor: defaultNextCursor, folders, totalCount: defaultTotalCount, comments: defaultComments, commentsTotal }) {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const [images, setImages] = useState(defaultImages)
    const [nextCursor, setNextCursor] = useState(defaultNextCursor)
    const [totalCount, setTotalCount] = useState(defaultTotalCount)
    const [activeFolder, setActiveFolder] = useState('')
    const [loaderActive, setLoaderActive] = useState(false)

    const [comments, setComments] = useState(defaultComments)
    const [commentsEnd, setCommentsEnd] = useState(false)




    const getMoreComments = async () => {

        const last = comments[comments.length - 1];
        const cursor = typeof last.time === 'number' ? fromMillis(last.time) : last.time;

        const query = firestore
            .collection('comments')
            .orderBy("time", "desc")
            .startAfter(cursor)
            .limit(LIMIT)

        const newComments = (await query.get()).docs.map((doc) => { return { id: doc.id, ...doc.data() } });

        setComments(comments.concat(newComments));

        if (newComments.length < LIMIT) {
            setCommentsEnd(true);
        }

    }


    async function handleLoadMore(event) {
        event.preventDefault()

        const results = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({
                nextCursor,
                expression: `folder="${activeFolder || ''}"`
            })
        }).then(r => r.json());

        const { resources, next_cursor: updatedNextCursor, total_count: updatedTotalCount } = results;

        const images = mapImageResources(resources)

        setImages(prev => {
            return [
                ...prev,
                ...images
            ]
        })

        setNextCursor(updatedNextCursor)
        setTotalCount(updatedTotalCount)
    }

    function handleOnFolderClick(event) {
        const folderPath = event.target.dataset.folderPath;
        setActiveFolder(folderPath)
        setNextCursor(undefined)
        setImages([]);
        setTotalCount(0);
    }

    useEffect(() => {
        (async function run() {
            const results = await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify({
                    expression: `folder="${activeFolder || ''}"`
                })
            }).then(r => r.json());

            const { resources, next_cursor: updatedNextCursor, total_count: updatedTotalCount } = results;

            const images = mapImageResources(resources)


            setImages(images);
            setNextCursor(updatedNextCursor)
            setTotalCount(updatedTotalCount)
        })()
    }, [activeFolder])


    function setClipboard(text) {
        var type = "text/plain";
        var blob = new Blob([text], { type });
        var data = [new window.ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(
            function () {
                setCopySuccess(true);
            }
        );
    }

    function copyToClipboard() {
        setClipboard(textAreaRef.current.innerHTML);
    }

    const LoadingSpinner = () => {

        useEffect(() => {
            return () => {
                setLoaderActive(true)
            };
        }, []);

        return (
            <Spinner
                className='gallery-spinner'
                size="xl"
                position="absolute"
                left="50%"
                top="50%"
                ml="calc(0px - var(--spinner-size) / 2)"
                mt="calc(0px - var(--spinner-size))"
                data-loader={loaderActive}
            />
        )
    }


    const clickItem = (data) => {
        ga.event({
            action: "click",
            params: {
                item: data
            }
        })
    }


    return (
        <Container className='index__content' maxW={"container.lg"} color={'white'} p={0}>
            <IndexContent></IndexContent>

            <Container maxW="container.lg" mt='30vh' px={0} className="second-container opacity-container"
                justifyContent='space-between'>
                <Box className='opacity-wrapper'>
                    <Box py='2em' justifyContent='space-around' display='flex' flexWrap='wrap' onClick={handleOnFolderClick}>
                        <Box key='""' p={2} >
                            <Button
                                fontSize='sm' variant='link'
                                colorScheme='white'
                                data-folder-path='""'
                                data-ga='Tattoos Gallery'
                                onClick={(e) => clickItem(e.target.getAttribute('data-ga'))}
                            >
                                Tattoos
                            </Button>
                        </Box>

                        {
                            folders.slice(0).reverse().map(folder => {
                                const isActive = folder.path === activeFolder
                                return (
                                    <Box key={folder.path} p={2} data-active-folder={isActive}>
                                        <Button variant='link'
                                            fontSize='sm'
                                            colorScheme='white'
                                            data-folder-path={folder.path}
                                            data-ga={folder.name + ' ' + 'Gallery'}
                                            onClick={(e) => clickItem(e.target.getAttribute('data-ga'))}
                                        >
                                            {folder.name}
                                        </Button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                        style={{ minHeight: 50 + 'vh' }}
                    >
                        {
                            images && images.length > 0 ?
                                images.map(image => {
                                    return (
                                        <Zoom key={image.id}>
                                            <Image src={image.src} width={image.width} height={image.height}
                                                alt={image.title}
                                                key={image.id}
                                                placeholder="blur"
                                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                                    convertImage(`${image.width}, ${image.height}`)
                                                )}`}
                                            />
                                        </Zoom>
                                    )

                                })
                                :
                                <LoadingSpinner></LoadingSpinner>
                        }
                    </Masonry>
                    {totalCount > images.length && (
                        <Flex
                            justifyContent='center'
                            mt={5}
                        >
                            <Button colorScheme='moth' onClick={handleLoadMore} display={loaderActive ? 'none' : 'block'}>
                                Load more
                            </Button>
                        </Flex>

                    )}
                </Box>
            </Container>

            <Box>
                <Heading my="5vh">
                    Reviews {commentsTotal.length >= 50 ? `(${commentsTotal.length})` : ""}
                </Heading>

                <Reviews comments={comments} totalComments={commentsTotal.length} starRating={commentsTotal.length} ></Reviews>
                {!loaderActive && !commentsEnd && LIMIT < commentsTotal.length &&
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <Button onClick={getMoreComments} colorScheme='moth' display={loaderActive ? 'none' : 'block'} mt='5vh' mb='10vh' w='sm' >Load more</Button>
                    </Box>
                }

                {commentsEnd && <Text textAlign='center' mt="2rem">No more comments to load.</Text>}
                <Box maxW='container.md' m="0 auto">
                    <Heading size="md" mt="8vh" mb="2vh">
                        Share your experience:
                    </Heading>
                    <AddNewComment/>

                </Box>
            </Box>


            <Container maxW='container.md' p={0} my='26vh'>
                <Box textAlign='center' mb={8 * 2}>
                    <Heading as='h1' size='4xl'>
                        Lets get weird
                    </Heading>
                </Box>
                <Flex
                    justifyContent='space-evenly'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Box>
                        <Heading size="md" mb={5}>
                            Hit me up and disappoint your mom.
                        </Heading>
                    </Box>
                    <Box p={7} border={'solid'} display='flex' flexDirection='column' borderRadius='15px'
                        borderColor={copySuccess ? '#22f640' : undefined}>
                        <Text alignSelf='center' ref={textAreaRef} mb={2} color={copySuccess ? '#22f640' : undefined}>
                            moth.1nk.666@gmail.com
                        </Text>
                        <Button onClick={(e) => {
                            copyToClipboard();
                            clickItem(e.target.getAttribute('data-ga'))
                        }
                        }
                            leftIcon={copySuccess ? <CheckIcon /> : <CopyIcon />}
                            colorScheme={copySuccess ? 'mothGreen' : "moth"}
                            data-ga="Email Copied"
                            variant='solid'>{copySuccess ? 'Email Copied' : 'Copy email'}</Button>
                    </Box>
                    <Text my={5}>
                        or DMs
                    </Text>
                    <Box position='relative' w='5em' h='5em'>
                        <Link
                            href='https://www.instagram.com/moth.1nk/'
                            isExternal
                            onClick={(e) => clickItem(e.target.getAttribute('data-ga'))}
                        >
                            <Image
                                alt='instagram'
                                src='/socials/instagram-white.png'
                                width='100%'
                                height='100%'
                                layout='responsive'
                                objectFit='contain'
                                data-ga="Instagram Footer"
                            />
                        </Link>
                    </Box>
                </Flex>
            </Container>
        </Container>
    );


}


function AddNewComment() {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [starRating, setStartRating] = useState('')


    const [values, setValues] = useState(
        [
            {
                column: 'pros',
                inputValues: [
                    {
                        value: '',
                        executed: false

                    }
                ]
            },
            {
                column: 'cons',
                inputValues: [
                    {
                        value: '',
                        executed: false
                    }
                ]
            }
        ]
    );


    // Validation
    const isValid = username.length > 3 && username.length < 100 && starRating > 0 && (values[0].inputValues[0].value.length > 0 || values[1].inputValues[0].value.length > 0);

    const addComment = async (e) => {
        e.preventDefault();

        const ref = firestore.collection('comments');

        let filteredValues = values.map((x) => { 
            let filtered = x.inputValues.filter(y => y.value);
            return {...x, inputValues: filtered}
        });


        const data = {
            username,
            content,
            starRating,
            filteredValues,
            time: serverTimestamp(),
        };

        await ref.add(data);

        setSubmitted(true);
        toast.success('Post created!');

    };


    const handleChange = (e, columnIndex, innerObjectIndex ) => {
        
        const { name, value } = e.target;
        
        let data = [...values]
        data[columnIndex]['inputValues'][innerObjectIndex][name] = value;
        setValues(data)


        if (!values[columnIndex]['inputValues'][innerObjectIndex]['executed']) {  // add a new input field

            setValues(values.map((elem, arrayIndex) => {
                let newfield = { value: '', executed: false }
                return arrayIndex === columnIndex
                 ? {...elem, inputValues: [...elem.inputValues, newfield]}
                 : elem
            }))

            data[columnIndex]['inputValues'][innerObjectIndex]['executed'] = true;

        }

        // remove next input field if the current is empty

        if (values[columnIndex]['inputValues'][innerObjectIndex][name].length === 0 && innerObjectIndex >= 0) { 

            // set the current object to false 
            data[columnIndex]['inputValues'][innerObjectIndex]['executed'] = false;

            // get the index of all the executed false objects
            let emptyIndex = [];
            values[columnIndex]['inputValues'].forEach((x, index) => {
                if (!x.executed) {
                    emptyIndex.push(index + 1)
                }
            });
            
            // get the lowest number
            const removeInputs = data[columnIndex]['inputValues'].length - Math.min(...emptyIndex);
            
            // removing the element using splice
            data[columnIndex]['inputValues'].splice(innerObjectIndex, removeInputs);

            // updating the list
            setValues(data);

        }


    };


    return (
        <form onSubmit={addComment}>
            <Box display={submitted ? 'none' : 'block'}>

                <StarsRating
                    allowHalf={false}
                    symbol={<Icon as={IoStar} fontSize='85px' />}
                    onChange={(val) => setStartRating(val)}
                />

                <Flex mt='1rem' mb='2rem'>
                        {
                            values.map((outerArray, columnIndex) => {
                                return (
                                    <Box flexBasis={'49%'} key={columnIndex}>
                                        <FormLabel> {columnIndex === 0 ? 'Pros' : 'Cons'} </FormLabel>
                                        {
                                            outerArray.inputValues.map((innerArray, innerObjectIndex) => {
                                                return (
                                                    <InputGroup display={'flex'} flexDirection='column' key={innerObjectIndex}>
                                                        <InputLeftElement
                                                            pointerEvents='none'
                                                        >
                                                            {
                                                                columnIndex === 0 ?
                                                                    <Icon as={IoAddCircleSharp} color={'green'} fontSize={'28px'} />
                                                                    :
                                                                    <Icon as={IoRemoveCircleSharp} color={'red'} fontSize={'28px'} />
                                                            }
                                                        </InputLeftElement>
                                                        <Input
                                                            value={values[columnIndex].inputValues.value}
                                                            variant='unstyled'
                                                            name='value'
                                                            lineHeight={'36px'}
                                                            columnIndex={columnIndex}
                                                            onChange={(event) => {
                                                                handleChange(event, columnIndex, innerObjectIndex);
                                                            }}
                                                            placeholder={'Write ' + outerArray.column.slice(0, -1) + ' number '+ (innerObjectIndex + 1) + ' here.'}
                                                        />
                                                    </InputGroup>
                                                )
                                            })

                                        }
                                    </Box>

                                )
                            })
                        }
                </Flex>

                <Box>
                    <FormLabel>Name</FormLabel>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Type your name here"
                        mb="15px"
                    />

                    <FormLabel>Comment (optional)</FormLabel>
                    <Textarea
                        value={content}
                        overflow='hidden'
                        resize='vertical'
                        placeholder="Type your comment here if you want to elaborate more, this is optional."
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Box>



                <Flex justifyContent={'center'}>

                </Flex>

                <Button type="submit" disabled={!isValid} color="black" mt='20px'>
                    Submit
                </Button>
            </Box>
            {
                submitted ? <Text>Your comment was submited, thanks for taking the time!</Text> : ""
            }
        </form>
    )

}



export async function getServerSideProps() {


    const results = await search({
        expression: 'folder=""'
    });

    const { resources, next_cursor: nextCursor, total_count: totalCount } = results;

    const images = mapImageResources(resources)


    const { folders } = await getFolders();

    const postsQuery = firestore
        .collection('comments')
        .orderBy("time", "desc")
        .limit(LIMIT);

    const postsTotal = firestore
        .collection('comments')
        .orderBy("time", "desc");


    const comments = (await postsQuery.get()).docs.map(postToJSON);

    const commentsTotal = (await postsTotal.get()).docs.map(postToJSON);


    return {
        props: {
            images,
            nextCursor: nextCursor || false,
            totalCount,
            folders,
            comments,
            commentsTotal
        }
    }

}


