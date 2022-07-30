import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Box, Heading } from '@chakra-ui/react';

import SocialSidebar from "../components/SocialSidebar";
import React, { useEffect } from "react";




import { useRouter } from 'next/router'


const IndexContent = () => {

    const router = useRouter();

    useEffect(() => {

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const homepage = '[data-page=homepage]'

        // background color change
        gsap.set(homepage, {backgroundColor: '#FF005C'});

        ScrollTrigger.create({
            trigger: '.second-container',
            start: 'top 25%',
            onEnter: () =>
                gsap.to(homepage, {
                    backgroundColor: '#000'
                }),
            onLeaveBack: () =>
                gsap.to(homepage, {
                    backgroundColor: '#FF005C'
                })

        });

        ScrollTrigger.create({
            trigger: '.first_section',
            start: 'top 19%',
            end: 'bottom 19%',
            onEnter: () => gsap.to('.first_section', {opacity: 1}),
            onLeave: () => gsap.to('.first_section', {opacity: 0}),
            onLeaveBack: () => gsap.to('.first_section', {opacity: 0}),
            onEnterBack: () => gsap.to('.first_section', {opacity: 1}),
        });


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


                <Heading as='h1' size='4xl' order={{base: '2', md: 'initial'}}>
                    Hi, I am Moth,
                </Heading>
                <Heading as={'h3'} mb={7} pt={'3'} fontWeight={'400'} order={{base: '3', md: 'initial'}}>
                    your tattoo artist.
                </Heading>
                <SocialSidebar/>
            </Box>

            
        </Box>
    )
}

export default IndexContent