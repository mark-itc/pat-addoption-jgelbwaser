import React, { useEffect, useState, useRef } from 'react';
import UseApi from '../../services/useApi';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import UiAvatar from '../ui/uiKit/componentsUi/UiAvatar';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import ModalTextField from '../ui/myAppUi/ModalTextField';
import AppButton from '../ui/myAppUi/AppButton';
import { UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert';
import TextLink from '../ui/myAppUi/TextLink';
import { closeModal, MODAL_OPTIONS, openModal, clearAppError } from '../../redux/reducers/appSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {

  const {  currentUser } = useSelector(state => state.auth)
  const { error, loading } = useSelector(state => state.app)

  const dispatch = useDispatch();
  const { signIn } = UseApi();
  const showAlert = error ? true : false
  const [newUserData, setNewUserData] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(clearAppError())
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    signIn(formObject);
    setNewUserData(formObject);
  }

  useEffect(() => { currentUser && dispatch(closeModal()) }, [currentUser, dispatch])

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(clearAppError())
  }

  const handleGoToLogin = () => {
    dispatch(openModal(MODAL_OPTIONS.login))
  }

  return (
    <UiFlexCol alignContent='center'>
      <UiFlexRow gapX={2} w100 alignItems='center' justifyContent='center'  >

        <UiAvatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </UiAvatar>
        <TextFontLogo component="h1" variant="h5">Sign In</TextFontLogo>
      </UiFlexRow>
      <UiBox component="form" onSubmit={handleSubmit} >
        <ModalTextField
          defaultValue={newUserData.firstName}
          required
          fullWidth
          label="First Name"
          name="firstName"
          autoComplete="firstName"
        />
        <ModalTextField
          defaultValue={newUserData.lastName}
          required
          fullWidth
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
        />
        <ModalTextField
          defaultValue={newUserData.email}
          required
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
        />
        <ModalTextField
          required
          defaultValue={newUserData.password}
          fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="password"
        />
        <ModalTextField
          defaultValue={newUserData.confirmPassword}
          required
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="confirmPassword"
        />
        <ModalTextField
          defaultValue={newUserData.phoneNumber}
          required
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          autoComplete="confirmPassword"
        />

        <UiBox my={2}>
          <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
        </UiBox>
        <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
          <AppButton type="submit" variant="contained" disabled={loading}>
            {loading ? 'Loading' : 'Sign In'}
          </AppButton>
          <AppButton variant="outlined" onClick={handleClose}>Close</AppButton>
        </UiFlexColToRowFrom>
        <UiBox mt={2}>

          <UiFlexRow justifyContent='center' >
            <TextLink href="#" variant="body2" onClick={handleGoToLogin}>
              Already have an account? Login
            </TextLink>
          </UiFlexRow>
        </UiBox>
      </UiBox>
    </UiFlexCol>
  )
}

