import { extendTheme } from '@chakra-ui/react'

const styles = {
    global: {
        body: {
            bg: '#000'
        }
    }
}

const fonts = {
    heading: "Quicksand",
    body: "Quicksand",
}

const colors = {
    moth: {
        50: '#ffe1f1',
        100: '#ffb1cf',
        200: '#ff7ead',
        300: '#ff4c8d',
        400: '#ff1a6c',
        500: '#e60053',
        600: '#b40040',
        700: '#82002e',
        800: '#50001c',
        900: '#21000a',
    },
    mothGreen: {
        50: '#deffe4',
        100: '#b1fdbc',
        200: '#81fa93',
        300: '#51f86a',
        400: '#22f640',
        500: '#09dd27',
        600: '#00ac1c',
        700: '#007b13',
        800: '#004b08',
        900: '#001b00',
    }
}


const theme = extendTheme({ styles, fonts, colors })
export default theme