import React from 'react'
import UiBox from '../uiKit/UiBox'
import UiContainer from '../uiKit/UiContainer'
import UiText from '../uiKit/UiText'
import UiTextFontLilitaOne from '../uiKit/UiTextFontLilitaOne'
import UiTextFontAmaticSC from '../uiKit/UiTextFontAmaticSC'
import UiStack from '../uiKit/layouts/UiStack'
import UiButton from '../uiKit/UiButton'
import UiStackRowSxCol from '../uiKit/layouts/UiStackRowSxCol'
import {  lightGreen } from '@mui/material/colors'

export default function Home() {
    return (
        <>
            <UiContainer maxWidth='md' >
                <UiStack direction='column' justifyContent='space-between' sx={{
                height: 'var(--vh, 100vh)',
            }}>

                    <UiBox>

                    <UiTextFontLilitaOne align="center" color='main.dark' variant="h1" >Furever Friends</UiTextFontLilitaOne>
                    <UiTextFontAmaticSC align="center" color='secondary.dark' bold={true} variant="h2" >Adopt a pet and find your forever companion</UiTextFontAmaticSC>
                    </UiBox>
                    <UiText variant="body1" color='mainAlt.main' >Our mission is to find loving homes for furry friends in need. We believe that every pet deserves a forever home. Browse our selection of adoptable pets today and find your new best friend.
                    </UiText>
                    <UiBox>
                    <UiTextFontAmaticSC align="center" color='secondary' bold={true} variant="h4">
                        "Pets are not our whole life, but they make our lives whole."
                    </UiTextFontAmaticSC>
                    <UiTextFontAmaticSC align="center" color='secondary.light' bold={true} variant="h5">
                        - Roger Caras -
                    </UiTextFontAmaticSC>
                    </UiBox>
                    <UiStackRowSxCol gap={2} justifyContent='center'>
                        <UiButton size='large' color='primary' variant='contained'>Log In</UiButton>
                        <UiButton size='large' color='primary' variant='contained'>Sign Up</UiButton>
                    </UiStackRowSxCol>
                    <UiStack  >
                        <img src='/assets/pics/HomeImage3.png' style={
                            {width: '100%',
                            margin: '0 auto',
                            maxWidth: '800px',
                            height: 'auto'}

                        } alt=""  />
                    </UiStack>

                </UiStack>
            </UiContainer>
        </>
    )
}
