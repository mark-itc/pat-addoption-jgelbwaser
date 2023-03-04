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
import { closeModal, MODAL_OPTIONS, openModal } from '../../redux/reducers/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
//import { setErrorState } from '../../redux/reducers/authSlice';
import UseApi from '../../services/useApi';


export default function Login() {
    const error = 'error';
    const loading = false;
    //const { error, loading, currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const { login } = UseApi();

    const handleSubmit = () => { 
        console.log('handleSubmit')
    }
    
    // const handleSubmitNew = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const email = formData.get('email');
    //     const password = formData.get('password')
    //     console.log(email, password)
    //     if (!email || !password) {
    //         //dispatch(setErrorState('Please enter an email and a password'))
    //         return
    //     }
    //     console.log('form submited');
    //     login({email, password});
    // }


    const handleClose = () => {
        dispatch(closeModal())
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
                    <UiAlertCollapse>{error}</UiAlertCollapse>
                </UiBox>
                <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
                    <AppButton type="submit" variant="contained">
                        {loading ? 'Loading' : 'Login'}
                    </AppButton>
                    <AppButton variant="outlined" onClick={handleClose}>Close</AppButton>
                </UiFlexColToRowFrom>
                <UiBox mt={2}>

                    <UiFlexRow justifyContent='center' >
                        <TextLink href="#" variant="body2" onClick={handleSignIn}>
                            Don't have an account? Sign Up
                        </TextLink>
                    </UiFlexRow>
                </UiBox>
            </UiBox>
        </UiFlexCol>
    )
}

