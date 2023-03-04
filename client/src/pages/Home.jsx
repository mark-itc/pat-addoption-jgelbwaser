import React from 'react'
import MyAppUiContainer from '../components/ui/myAppUi/MyAppUiContainer'
import UiText from '../components/ui/uiKit/componentsUi/UiText'
import UiTextFontLilitaOne from '../components/ui/myAppUi/TextFontLogo'
import TextFontAlt from '../components/ui/myAppUi/TextFontAlt'
import AppButton from '../components/ui/myAppUi/AppButton'
import { UiFlexCol, UiFlexColToRowFrom } from '../components/ui/uiKit/layouts/UiFlex'
import UiDiv from '../components/ui/uiKit/layouts/UiDiv'
import { useDispatch } from 'react-redux'
import { MODAL_OPTIONS, openModal } from '../redux/reducers/modalSlice'

export default function Home() {

    const dispatch = useDispatch()

    const handleLoginClick = () => {dispatch(openModal(MODAL_OPTIONS.login))}
    const handleSignInClick = () => {dispatch(openModal(MODAL_OPTIONS.signIn))}


    return (
            <MyAppUiContainer sx={{flex:1}}>
                <UiFlexCol justifyContent='space-between' sx={{height:'100%'}}>
                    <UiDiv>
                        <UiTextFontLilitaOne align="center" color='main.dark' variant="h1" >Furever Friends</UiTextFontLilitaOne>
                        <TextFontAlt align="center" color='secondary.dark' bold={true} variant="h2" >Adopt a pet and find your forever companion</TextFontAlt>
                    </UiDiv>
                    <UiText variant="body1" color='mainAlt.main' >Our mission is to find loving homes for furry friends in need. We believe that every pet deserves a forever home. Browse our selection of adoptable pets today and find your new best friend.
                    </UiText>
                    <UiDiv>
                        <TextFontAlt align="center" color='secondary' bold={true} variant="h4">
                            "Pets are not our whole life, but they make our lives whole."
                        </TextFontAlt>
                        {/* <UiTextFontAmaticSC align="center" color='secondary.light' bold={true} variant="h5">
                            - Roger Caras -
                        </UiTextFontAmaticSC> */}
                    </UiDiv>
                    <UiFlexColToRowFrom from='sm' gap={2} justifyContent='center'>
                        <AppButton onClick={handleLoginClick} size='large' color='primary' variant='contained'>Log In</AppButton>
                        <AppButton onClick={handleSignInClick} size='large' color='primary' variant='contained'>Sign Up</AppButton>
                    </UiFlexColToRowFrom>
                    <UiDiv>
                        <img src='/assets/pics/HomeImage3.png' style={
                            {
                                width: '100%',
                                margin: '0 auto',
                                maxWidth: '800px',
                                height: 'auto'
                            }

                        } alt="" />
                    </UiDiv>
                </UiFlexCol>
            </MyAppUiContainer>
    )
}
