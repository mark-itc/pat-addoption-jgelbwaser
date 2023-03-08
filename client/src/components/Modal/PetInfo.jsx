import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAppError, closeModal, MODAL_OPTIONS, openModal } from '../../redux/reducers/appSlice'
import AppButton from '../ui/myAppUi/AppButton'
import TextFontLogo from '../ui/myAppUi/TextFontLogo'
import TextLink from '../ui/myAppUi/TextLink'
import { UiAlertCollapse } from '../ui/uiKit/componentsUi/UiAlert'
import UiCardMedia from '../ui/uiKit/componentsUi/UiCard/UiCardMedia'
import UiBox from '../ui/uiKit/layouts/UiBox'
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../ui/uiKit/layouts/UiFlex'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from '@emotion/styled'
import { FILTER_OPTIONS } from '../../config/config'


export default function PetInfo() {

  const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
    color: theme.palette.secondary.main,
    '&:hover': {
        color: theme.palette.primary.main,
    },
  }));

//type, name, status, picture, height, weight,    
//color, bio, hypoallergenic, DietaryRestrictions, breed
  const { error, loading } = useSelector(state => state.app)
  const pet = useSelector(state => state.pet.selectedPet)
  const dispatch = useDispatch();
  const showAlert = error ? true : false

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(clearAppError())
}

const handleGoToLogin = () => {
  dispatch(openModal(MODAL_OPTIONS.login))
}

const handleGoToSignIn = () => {
  dispatch(openModal(MODAL_OPTIONS.signIn))
}



  return (
  
    <UiBox minWidth='500px'>
      <UiFlexCol alignContent='center'>

      {/* <UiCardMedia
                crossOrigin="anonymous"
                component="img"
                alt="green iguana"
                height="200"
                image={process.env.REACT_APP_API_PICS_URL + pet.picture}
        />*/}

<UiFlexRow gap={1} alignItems='center'>
                
                <StyledFavoriteBorderIcon  />
               <TextFontLogo color='main.dark' variant='h6' >{pet?.name}</TextFontLogo> 
                </UiFlexRow>
                <TextFontLogo color='main.main' variant='h6' >
                {pet && FILTER_OPTIONS.status[pet?.status].toLowerCase() }
               </TextFontLogo>
      <UiBox p={3}> 

      <UiBox my={2}>
                    <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
                </UiBox>
      <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
        <AppButton type="submit" variant="contained" onClick={handleGoToLogin} disabled={loading}>
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
