import {Container, Box, Heading, Flex, Center, Image, Stack, Text, Button, Link} from '@chakra-ui/react';
import {CopyIcon, CheckIcon} from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import Section from "../components/section";

import VoxelDogLoader from '../components/model-loader'
import SocialSidebar from "../components/SocialSidebar";

import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {useEffect} from 'react'

import React, {useRef, useState} from 'react';


const LazyVoxelDog = dynamic(() => import('../components/model-custom'), {
    ssr: false,
    loading: () => <VoxelDogLoader/>
})

const Page = () => {

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




    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function setClipboard(text) {
        var type = "text/plain";
        var blob = new Blob([text], {type});
        var data = [new ClipboardItem({[type]: blob})];

        navigator.clipboard.write(data).then(
            function () {
                setCopySuccess(true);
            }
        );
    }

    function copyToClipboard() {
        setClipboard(textAreaRef.current.innerHTML);
    }

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

            <Container maxW="container.lg" mt='30vh' px={0} className="second-container opacity-container" justifyContent='space-between'>
                <Flex
                    flexDirection={{base: 'column', md: 'row'}}
                >
                    <Center className='index-text--content' flexDirection='column' px={10}>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>
                    <Center>
                        <Image src='/image6.png' alt='Tattoo Image'/>
                    </Center>
                </Flex>
            </Container>

            <Container maxW="container.lg" mt='35vh' px={0} className="third-container opacity-container" justifyContent='space-between'>
                <Flex
                    flexDirection={{base: 'column', md: 'row'}}
                >
                    <Center order={{base: '2', md: 'initial'}}>
                        <Image src='/image6.png' alt='Tattoo Image'/>
                    </Center>
                    <Center className='index-text--content' flexDirection='column'  px={10} order={{base: '1', md:'initial'}}>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>
                </Flex>
            </Container>

            <Container maxW="container.lg" mt='35vh' className="fourth-container opacity-container " >
                <Flex
                    flexDirection='column'
                    mb={10}
                >
                    <Center className='index-text--content' flexDirection='column' py={8}>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>

                    <Box
                        direction={{base: 'row', md: 'column'}}
                        display='flex'
                        alignItems="center"
                        justify="center"
                        justifyContent='space-between'
                        flexWrap='wrap'
                    >
                        <Image w={{base: '100%', md: '33%'}} src='/image6.png'/>
                        <Image w={{base: '100%', md: '33%'}} my={2} src='/image6.png'/>
                        <Image w={{base: '100%', md: '33%'}} src='/image6.png'/>

                    </Box>
                </Flex>

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