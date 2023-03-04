import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexDiv, UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import UiAvatar from '../ui/uiKit/componentsUi/UiAvatar';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import ModalTextField from '../ui/myAppUi/ModalTextField';
import UiFormControlLabel from '../ui/uiKit/componentsUi/UiFormControlLabel';
import UiCheckbox from '../ui/uiKit/componentsUi/UiCheckbox';
import AppButton from '../ui/myAppUi/AppButton';
import { UiAlertCloseOption, UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert';
import TextLink from '../ui/myAppUi/TextLink';
import { textAlign } from '@mui/system';
import { useDispatch } from 'react-redux';
import { MODAL_OPTIONS, openModal } from '../../redux/reducers/modalSlice';


export default function Login() {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submited')
    }

    const handleClose = () => {
        console.log('close modal')
    }

    const handleSignIn = () => {
        dispatch(openModal(MODAL_OPTIONS.signIn))
    }

    return (
        <UiFlexCol alignContent='center'>
            <UiFlexRow gapX={2} w100 alignItems='center' justifyContent='center'  >

                <UiAvatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </UiAvatar>
                <TextFontLogo component="h1" variant="h5">Log In</TextFontLogo>
            </UiFlexRow>
            <UiBox component="form" onSubmit={handleSubmit} >
                <ModalTextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <ModalTextField
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                />
                {/* <UiFormControlLabel
                    control={<UiCheckbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <UiBox my={2}>
                    <UiAlertCollapse>Error</UiAlertCollapse>
                </UiBox>
                <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
                    <AppButton type="submit" variant="contained">Login</AppButton>
                    <AppButton onClick={handleClose}>Close</AppButton>
                </UiFlexColToRowFrom>
                <UiFlexRow justifyContent='center' >
                    <TextLink href="#" variant="body2" onClick={handleSignIn}>
                        {"have an account? Sign Up"}
                    </TextLink>
                </UiFlexRow>
            </UiBox>
        </UiFlexCol>
    )
}

{/* <UiBox>
    <UiDiv >
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
    </UiDiv>
    <UiTextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
    />
    <UiTextField
        autoFocus
        margin="dense"
        id="password"
        label="Email Address"
        type="password"
        fullWidth
        variant="standard"
    />
    <AppButton onClick={handleClose}>Cancel</AppButton>
    <AppButton onClick={handleClose} variant="outlined">Subscribe</AppButton>
</UiBox> */}
