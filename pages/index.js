import React, { useEffect, useRef, useState } from 'react'
import {Container, Box, Heading, Flex, Text, Button, Link, Spinner} from '@chakra-ui/react';
import Masonry from 'react-masonry-css'
import { CopyIcon, CheckIcon } from '@chakra-ui/icons'


import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import IndexContent from "../components/indexContent";

import {search, mapImageResources, getFolders} from "../lib/cloudinary";

import { convertImage, toBase64 } from "../components/imagePreloader";

const Page = ({images: defaultImages, nextCursor: defaultNextCursor, folders, totalCount: defaultTotalCount}) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const [images, setImages] = useState(defaultImages)
    const [nextCursor, setNextCursor] = useState(defaultNextCursor)
    const [totalCount, setTotalCount] = useState(defaultTotalCount)
    const [activeFolder, setActiveFolder] = useState('')
    const [loaderActive, setLoaderActive] = useState(false)


    async function handleLoadMore(event) {
        event.preventDefault()

        const results = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({
                nextCursor,
                expression: `folder="${activeFolder || ''}"`
            })
        }).then(r => r.json());

        const {resources, next_cursor: updatedNextCursor, total_count: updatedTotalCount} = results;

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

            const {resources, next_cursor: updatedNextCursor, total_count: updatedTotalCount} = results;

            const images = mapImageResources(resources)


            setImages(images);
            setNextCursor(updatedNextCursor)
            setTotalCount(updatedTotalCount)
        })()
    }, [activeFolder])

    function setClipboard(text) {
        var type = "text/plain";
        var blob = new Blob([text], {type});
        var data = [new window.ClipboardItem({[type]: blob})];

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


    return (
        <Container className='index__content' maxW={"container.lg"} p={0}>
            <IndexContent></IndexContent>

            <Container maxW="container.lg" mt='30vh' px={0} className="second-container opacity-container"
                       justifyContent='space-between'>
                <Box className='opacity-wrapper'>
                    <Box py='2em' justifyContent='space-around' display='flex' onClick={handleOnFolderClick}>
                        <Box key='""'>
                            <Button fontSize='3xl' variant='link'
                                     colorScheme='white'
                                    data-folder-path='""'>Tattoos
                            </Button>
                        </Box>

                        {
                            folders.slice(0).reverse().map(folder => {
                                console.log(folder)
                                const isActive  = folder.path === activeFolder
                                return (
                                    <Box key={folder.path} data-active-folder={isActive}>
                                        <Button variant='link' fontSize='3xl' colorScheme='white'
                                                data-folder-path={folder.path}>{folder.name}</Button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
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
                        <Button onClick={copyToClipboard} leftIcon={copySuccess ? <CheckIcon/> : <CopyIcon/>}
                                colorScheme={copySuccess ? 'mothGreen' : "moth"}
                                variant='solid'>{copySuccess ? 'Email Copied' : 'Copy email'}</Button>
                    </Box>
                    <Text my={5}>
                        or DMs
                    </Text>
                    <Box position='relative' w='5em' h='5em'>
                        <Link href='https://www.instagram.com/moth.1nk/' isExternal>
                            <Image
                                alt='instagram'
                                src='/socials/instagram-white.png'
                                width='100%'
                                height='100%'
                                layout='responsive'
                                objectFit='contain'
                                _hover={{filter: "opacity(0.5) drop-shadow(0px 0px #e60053) saturate(8)"}}
                            />
                        </Link>
                    </Box>
                </Flex>
            </Container>

        </Container>
    );
}

export default Page

export async function getStaticProps() {

    const results = await search({
        expression: 'folder=""'
    });

    const {resources, next_cursor: nextCursor, total_count: totalCount} = results;

    const images = mapImageResources(resources)

    const {folders} = await getFolders();

    return {
        props: {
            images,
            nextCursor: nextCursor || false,
            totalCount,
            folders
        }
    }

}