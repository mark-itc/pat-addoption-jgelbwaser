import { createTheme, responsiveFontSizes } from '@mui/material'

//brownDark = #443E3A -> 68, 62, 58
//brownDark = #7C7875 -> calc 124, 120, 117
//brownLight = #B4B2B1 - > 180, 178, 177

//brownDark11=#4C3731
//brownMain1=#816C64
//brownlight1=#9F897F
//browsoft=#FFF0E5

//redDark= #C9163D
//redMain= #EE2044
//pink= #FF637E


//yellowDark=    B36C36    calc
//yellowMain= #E88B46 = 232, 239,70
//yellowLight= #FFAA5C = 255,170, 92





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
            main: 'FFF0E5'
        }
    },

});

export default theme = responsiveFontSizes(theme);