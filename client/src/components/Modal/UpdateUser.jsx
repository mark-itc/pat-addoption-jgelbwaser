import React, { useState } from 'react';
import UseApi from '../../services/useApi';
import UiBox from '../ui/uiKit/layouts/UiBox';
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import ModalTextField from '../ui/myAppUi/ModalTextField';
import AppButton from '../ui/myAppUi/AppButton';
import { UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert';
import { closeModal } from '../../redux/reducers/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorState } from '../../redux/reducers/authSlice';
import UiAvatarFromName from '../ui/uiKit/componentsUi/UiAvatarFromName';

export default function UpdateProfile() {

  const { error, loading, currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const { updateUser } = UseApi();
  const showAlert = error ? true : false
  const [newUserData, setNewUserData] = useState(currentUser)
  const fullName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';


  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(clearErrorState())
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    updateUser(formObject);
    setNewUserData(formObject);
  }

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(clearErrorState())
  }



  return (
    <UiFlexCol alignContent='center'>
      <UiFlexRow gapX={2} w100 alignItems='center' justifyContent='center'  >
        <UiBox m={1}>
        {currentUser ? <UiAvatarFromName>{fullName.toUpperCase()}</UiAvatarFromName> : null}
        </UiBox>
        <TextFontLogo component="h1" variant="h5">Update User</TextFontLogo>
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
          defaultValue={newUserData.phoneNumber}
          required
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          autoComplete="confirmPassword"
        />
        <ModalTextField
          defaultValue={newUserData.password}
          fullWidth
          label="New Password (Optional)"
          name="password"
          type="password"
          autoComplete="password"
        />
        <ModalTextField
          defaultValue={newUserData.confirmPassword}
          fullWidth
          label="Confirm New Password (Optional)"
          name="confirmPassword"
          type="password"
          autoComplete="confirmPassword"
        />
        <UiBox my={2}>
           <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse> 
        </UiBox>
        <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
          <AppButton type="submit" variant="contained" disabled={loading}>
            {loading ? 'Loading' : 'Save'}
          </AppButton>
          <AppButton variant="outlined" onClick={handleClose}>Close</AppButton>
        </UiFlexColToRowFrom>
        <UiBox mt={2}>


        </UiBox>
      </UiBox>
    </UiFlexCol>
  )
}

