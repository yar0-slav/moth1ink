import {Container, Box, Heading, Flex, Text, Button, Link} from '@chakra-ui/react';
import Masonry from 'react-masonry-css'
import {CopyIcon, CheckIcon} from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import Section from "../components/section";

import Image from 'next/image'

import VoxelDogLoader from '../components/model-loader'
import SocialSidebar from "../components/SocialSidebar";


import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {useEffect, useRef, useState} from 'react'

import {search, mapImageResources, getFolders} from "../lib/cloudinary";


const LazyVoxelDog = dynamic(() => import('../components/model-custom'), {
    ssr: false,
    loading: () => <VoxelDogLoader/>
})

const Page = ({images: defaultImages, nextCursor: defaultNextCursor, folders}) => {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    const [images, setImages] = useState(defaultImages)
    const [nextCursor, setNextCursor] = useState(defaultNextCursor)
    const [activeFolder, setActiveFolder] = useState('')
    console.log(activeFolder)

    useEffect(() => {

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        gsap.set("body", {backgroundColor: '#FF005C',});

        ScrollTrigger.create({
            trigger: '.second-container',
            start: 'top 75%',
            onEnter: () =>
                gsap.to('body', {
                    backgroundColor: '#000',
                    color: '#fff',
                }),
            onLeaveBack: () =>
                gsap.to('body', {
                    backgroundColor: '#FF005C',
                    color: '#000'
                })
        });


        gsap.utils.toArray(".opacity-container").forEach(function (elem) {

            const img = elem.querySelector('div')
            const text = elem.querySelector('.index-text--content')

            gsap.set(img, {opacity: 0})

            ScrollTrigger.create({
                trigger: elem,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => gsap.to(img, {opacity: 1}),
                onLeaveBack: () => gsap.to(img, {opacity: 0}),
                onEnterBack: () => gsap.to(img, {opacity: 1}),
            });


            gsap.to(text, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 50%",
                    end: 'bottom 50%',
                    scrub: 1
                },
            });

        });

        ScrollTrigger.create({
            trigger: '.first_section',
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => gsap.to('.first_section', {opacity: 1}),
            onLeave: () => gsap.to('.first_section', {opacity: 0}),
            onLeaveBack: () => gsap.to('.first_section', {opacity: 0}),
            onEnterBack: () => gsap.to('.first_section', {opacity: 1}),
        });

    }, [])


    async function handleLoadMore(event) {
        event.preventDefault()

        const results = await fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({
                nextCursor,
                expression: `folder="${activeFolder}"`
            })
        }).then(r => r.json());

        const {resources, next_cursor: updatedNextCursor} = results;

        const images = mapImageResources(resources)

        setImages(prev => {
            return [
                ...prev,
                ...images
            ]
        })

        setNextCursor(updatedNextCursor)
    }


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

    function handleOnFolderClick(event) {
        const folderPath = event.target.dataset.folderPath;
        setActiveFolder(folderPath)
        setNextCursor(undefined)
        setImages([]);
    }

    useEffect(() => {
        (async function run() {
            const results = await fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify({
                    nextCursor,
                    expression: `folder="${activeFolder}"`
                })
            }).then(r => r.json());

            const {resources, next_cursor: updatedNextCursor} = results;

            const images = mapImageResources(resources)

            setImages(prev => {
                return [
                    ...prev,
                    ...images
                ]
            })

            setNextCursor(updatedNextCursor)
        })()
    }, [activeFolder])

    return (
        <Container className='index__content' maxW={"container.lg"} p={0}>
            <Section>
                <Box className='first_section' borderRadius={"lg"} position='relative'>
                    <Heading as='h1' size='4xl'>
                        Hi, I am Moth,
                    </Heading>
                    <Heading as={'h3'} mb={7} pt={'3'} fontWeight={'400'}>
                        your tattoo artist.
                    </Heading>
                    <SocialSidebar/>
                    <LazyVoxelDog/>
                </Box>
            </Section>

            <Container maxW="container.lg" mt='30vh' px={0} className="second-container opacity-container"
                       justifyContent='space-between'>
                <Box onClick={handleOnFolderClick}>
                    <Box key='""'>
                        <Button as='h1' data-folder-path='""'>Tattoos</Button>
                    </Box>
                    {folders.map(folder => {
                        return (
                            <Box key={folder.path}>
                                <Button as='h1' data-folder-path={folder.path}>{folder.name}</Button>
                            </Box>
                        )
                    })}
                </Box>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map(image => {
                        return (
                            <Image src={image.src} width={image.width} height={image.height} alt={image.title}
                                   key={image.id}/>
                        )
                    })}
                </Masonry>
                <Button onClick={handleLoadMore}>
                    Load more
                </Button>

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
                            Hit me up and dissapoint your mom.
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

    const {resources, next_cursor: nextCursor} = results;

    const images = mapImageResources(resources)

    const {folders} = await getFolders();

    console.log(folders)

    return {
        props: {
            images,
            nextCursor: nextCursor || false,
            folders
        }
    }

}