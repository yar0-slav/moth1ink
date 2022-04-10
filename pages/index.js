import {Container, Box, Heading, Flex, Center, Spacer, Image, VStack, HStack} from '@chakra-ui/react';
import dynamic from 'next/dynamic'
import Section from "../components/section";

import VoxelDogLoader from '../components/model-loader'
import SocialSidebar from "../components/layouts/SocialSidebar";

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from 'react'


const LazyVoxelDog = dynamic(() => import('../components/model-custom'), {
    ssr: false,
    loading: () => <VoxelDogLoader />
})

const Page = () => {

    useEffect(() => {

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }


        ScrollTrigger.create({
            trigger: '.second-container',
            start:'top 75%',
            onEnter: () =>
                gsap.to('.background-color--change', {
                    backgroundColor: '#000',
                    color: '#fff',
                }),
            onLeaveBack: () =>
                gsap.to('.background-color--change', {
                    backgroundColor: '#FF005C',
                    color: '#000'
                })
        });



        gsap.utils.toArray(".opacity-container").forEach(function(elem) {

            const img = elem.querySelector('div')
            const text = elem.querySelector('.index-text--content')

            gsap.set(img, {opacity:0})

            ScrollTrigger.create({
                trigger: elem,
                start:'top 50%',
                end:'bottom 50%',
                onEnter: () => gsap.to(img, {opacity:1}),
                onLeaveBack: () => gsap.to(img, {opacity:0}),
                onEnterBack: () => gsap.to(img, {opacity:1}),
            });



            gsap.to(text, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 50%", // the default values
                    end:'bottom 50%',
                    scrub: 1
                },
            });

        });

    }, [])

    return (
        <Container className='index__content' maxW={"container.lg"}>
            <Section>
                <Box borderRadius={"lg"}  p={"5"} position='relative'>
                    <Heading  as='h1' size='4xl'>
                        Hi, I am Moth,
                    </Heading>
                    <Heading as={'h3'} pt={'3'} fontWeight={'400'}>
                        your tattoo artist.
                    </Heading>
                    <LazyVoxelDog />
                    <SocialSidebar/>
                 </Box>
            </Section>

            <Container maxW="container.lg" mt='30vh' className="second-container opacity-container">
                <Flex
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <Center className='index-text--content' flexDirection='column'>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>
                    <Spacer />
                    <Center>
                        <Image src='/image6.png' alt='Tattoo Image' />
                    </Center>
                </Flex>
            </Container>

            <Container maxW="container.lg" mt='35vh' className="third-container opacity-container">
                <Flex
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <Center>
                        <Image src='/image6.png' alt='Tattoo Image' />
                    </Center>
                    <Spacer />
                    <Center className='index-text--content' flexDirection='column'>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>
                </Flex>
            </Container>

            <Container maxW="container.lg" mt='35vh' className="fourth-container opacity-container">
                <Flex
                    flexDirection='column'
                    mb={10}
                >
                    <Center flexDirection='column'>
                        <Heading as='h1' size='4xl'>Precise lines.</Heading>
                        <Heading as='h4' size='lg' fontWeight={'400'}>Are what make or break a tattoo.</Heading>
                    </Center>

                    <HStack
                        direction={{base: 'row' ,md: 'column'}}
                        display='flex'
                        alignItems="center"
                        justify="center"
                        spacing='3px'
                        flexWrap='wrap'
                    >
                        <Image w={{base:'100%', md:'33%'}} src='/image6.png'/>
                        <Image w={{base:'100%', md:'33%'}} src='/image6.png'/>
                        <Image w={{base:'100%', md:'33%'}} src='/image6.png'/>

                    </HStack>
                </Flex>

            </Container>

        </Container>
    )
}

export default Page