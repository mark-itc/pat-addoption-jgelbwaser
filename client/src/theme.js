import { createTheme, responsiveFontSizes } from '@mui/material'


 let theme = createTheme({
    overrides: {
        ':root': {
            '--vh': 'calc(var(--vh, 1vh) * 100)'
        },
    },
    palette: {
        primary: {
            light: '#FF637E',
            main: '#EE2044',
            dark: '#C9163D',
        },
        secondary: {
            light: '#FFAA5C',
            main: '#E88B46',
            dark: '#B36C36',

        },
        main: {
            light: '#B4B2B1',
            main: '#7C7875',
            dark: '#443E3A',
        },
        mainAlt: {
            light: '#9F897F',
            main: '#816C64',
            dark: '#4C3731',
        },
        soft: {
            light: 'FFF0E5',
            main: 'FFF0E5',
            dark: 'FFF0E5'

        },
        dark: {
            main: '#443E3A',
            contrastText: '#fff'
        },
        white: {
            main: '#ffffff',
        },
        black: {
            main: '#000000',
        }
    },

});

export default theme = responsiveFontSizes(theme);