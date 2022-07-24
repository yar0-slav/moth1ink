import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Box, Heading, Icon } from '@chakra-ui/react';

import VoxelDogLoader from '../components/model-loader'
import SocialSidebar from "../components/SocialSidebar";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import Section from "./section";

import { IoChevronDown } from 'react-icons/io5'



import { useRouter } from 'next/router'

const LazyVoxelDog = dynamic(() => import('../components/model-custom'), {
    ssr: false,
    loading: () => <VoxelDogLoader/>
})

const IndexContent = () => {
    const iconSize = '3em';
    const router = useRouter();
 
    useEffect(() => {

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const homepage = '[data-page=homepage]'

        // background color change
        gsap.set(homepage, {backgroundColor: '#FF005C',});

        ScrollTrigger.create({
            trigger: '.second-container',
            start: 'top 75%',
            onEnter: () =>
                gsap.to(homepage, {
                    backgroundColor: '#000'
                }),
            onLeaveBack: () =>
                gsap.to(homepage, {
                    backgroundColor: '#FF005C'
                })

        });


        gsap.utils.toArray(".opacity-container").forEach(function (elem) {

            const x = elem.querySelector('.opacity-wrapper')
            const text = elem.querySelector('.index-text--content')

            gsap.set(x, {opacity: 0})

            ScrollTrigger.create({
                trigger: elem,
                start: 'top 75%',
                end: 'bottom 50%',
                onEnter: () => gsap.to(x, {opacity: 1}),
                onLeaveBack: () => gsap.to(x, {opacity: 0}),
                onEnterBack: () => gsap.to(x, {opacity: 1}),
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
            start: 'top 75%',
            end: 'bottom 40%',
            onEnter: () => gsap.to('.first_section', {opacity: 1}),
            onLeave: () => gsap.to('.first_section', {opacity: 0}),
            onLeaveBack: () => gsap.to('.first_section', {opacity: 0}),
            onEnterBack: () => gsap.to('.first_section', {opacity: 1}),
        });


        gsap.to('.bounceChevron--hp', {duration: .8, y:1, ease:"sine.easeIn", repeat:-1, yoyo:true})


        const handleRouteChange = (url) => {
            if (url === '/meetmoth') {
                gsap.set('.background-color--change', {clearProps: true});
            }
        }


        router.events.on('routeChangeStart', handleRouteChange)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }

    }, []);

    return (
        <Box position='relative' className='first_section'>
            <Box borderRadius={"lg"} display='flex'
                flexDirection='column' 
            >

                <LazyVoxelDog/>

                <Heading as='h1' size='4xl' order={{base: '2', md: 'initial'}}>
                    Hi, I am Moth,
                </Heading>
                <Heading as={'h3'} mb={7} pt={'3'} fontWeight={'400'} order={{base: '3', md: 'initial'}}>
                    your tattoo artist.
                </Heading>
                <SocialSidebar/>
            </Box>
            <Box className="bounceChevron--hp" id="helpme" display='flex' placeContent={'center'} top='calc(100vh - 130px)' transform='translateY(-100%)' position={'absolute'} w='100%'>
                <Icon as={IoChevronDown} w={iconSize} h={iconSize} color={'white'} />
            </Box>
        </Box>
    )
}

export default IndexContent