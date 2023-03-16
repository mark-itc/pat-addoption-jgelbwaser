import React, { useEffect } from 'react';
import UseApi from '../../services/useApi';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import UiAvatar from '../ui/uiKit/componentsUi/UiAvatar';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import ModalTextField from '../ui/myAppUi/ModalTextField';
// eslint-disable-next-line
import UiFormControlLabel from '../ui/uiKit/componentsUi/UiFormControlLabel';
// eslint-disable-next-line
import UiCheckbox from '../ui/uiKit/componentsUi/UiCheckbox';
import AppButton from '../ui/myAppUi/AppButton';
import { UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert';
import TextLink from '../ui/myAppUi/TextLink';
import { closeModal, MODAL_OPTIONS, openModal, clearAppError,  setAppError } from '../../redux/reducers/appSlice';
import { useSelector, useDispatch } from 'react-redux';
//import { clearAppError,  setAppError } from '../../redux/reducers/appSlice';



export default function Login() {

    const { error, loading } = useSelector(state => state.app)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const { login } = UseApi();
    const showAlert = error ? true : false

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(clearAppError())
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password')
        if (!email || !password) {
            dispatch(setAppError('Please enter an email and a password'))
            return
        }
        login({ email, password });
    }

    useEffect(() => { currentUser && dispatch(closeModal()) }, [currentUser, dispatch])

    const handleClose = () => {
        dispatch(closeModal())
        dispatch(clearAppError())
    }

    const handleGoToSignIn = () => {
        dispatch(openModal(MODAL_OPTIONS.signIn))
    }

    return (
        <UiBox p={3}>
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
                    <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
                </UiBox>
                <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
                    <AppButton type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Loading' : 'Login'}
                    </AppButton>
                    <AppButton variant="outlined" onClick={handleClose}>Close</AppButton>
                </UiFlexColToRowFrom>
                <UiBox mt={2}>

                    <UiFlexRow justifyContent='center' >
                        <TextLink href="#" variant="body2" onClick={handleGoToSignIn}>
                            Don't have an account? Sign Up
                        </TextLink>
                    </UiFlexRow>
                </UiBox>
            </UiBox>
        </UiFlexCol>
        </UiBox>
    )
}

